import { useMutation, gql, ApolloCache } from "@apollo/client";
import { Book, BookFilter, getParamsFromStoreFieldName } from "../../lib/utils";
import { toast } from "sonner";
import { GET_BOOKS } from "./useGetBooks";

type StoreParams = {
  filter?: BookFilter;
};
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $categories: [CategoryInput]) {
    addBook(title: $title, categories: $categories) {
      id
      title
      categories {
        id
        name
      }
    }
  }
`;

type ReturnData = {
  addBook: Book & { __typename: "Book" };
};
type AddBookVars = Omit<Book, "id">;

export const useAddBook = () => {
  const [addBook, { loading }] = useMutation<ReturnData, AddBookVars>(
    ADD_BOOK,
    {
      onError() {
        toast.error("Error adding book");
      },

      onCompleted() {
        toast.success("Book added successfully");
      },

      update(cache, { data }) {
        if (!data?.addBook) return;
        
        // updateCacheWithWriteFragment(cache, data.addBook);
        // updateCacheWithSimpleToReference(cache, data.addBook);
        // updateCacheWithReadWriteQuery(cache, data.addBook);
        // updateCacheWithUpdateQuery(cache, data.addBook);
        // updateCacheWithCategoryFiltering(cache, data.addBook);
        updateCachePerCategoryQuery(cache, data.addBook);
        
      },
    },
  );

  return {
    loading,
    addBook,
  };
};

// ====== DEMO HELPER FUNCTIONS - NOT USED IN PRODUCTION ======

// APPROACH 1: readQuery + writeQuery (Basic method)
export const updateCacheWithReadWriteQuery = (cache: ApolloCache<any>, addedBook: any) => {
  try {
    // Read the current books from cache
    const existingData = cache.readQuery<{ books: any[] }>({ 
      query: GET_BOOKS,
      variables: { filter: null }, 
    });
    
    // Write back with the new book added
    cache.writeQuery({
      query: GET_BOOKS,
      variables: { filter: null },
      data: {
        books: [...(existingData?.books || []), addedBook]
      },
    });
    // ISSUE: Only updates one specific query; doesn't handle parameterized queries
  } catch (e) {
    console.error("Error updating cache:", e);
  }
};

// APPROACH 2: updateQuery - Simpler Alternative
export const updateCacheWithUpdateQuery = (cache: ApolloCache<any>, addedBook: any) => {
  cache.updateQuery<{ books: any[] }>(
    { query: GET_BOOKS, variables: { filter: null } },
    (existingData) => ({
      books: [...(existingData?.books || []), addedBook]
    })
  );
  // ISSUE: Still only updates one specific query
};

// APPROACH 3: cache.modify with writeFragment (Manual approach)
export const updateCacheWithWriteFragment = (cache: ApolloCache<any>, addedBook: any) => {
  cache.modify({
    fields: {
      books(existingRefs = []) {
        // 1. Write the new Book into the cache and grab its Reference
        const newBookRef = cache.writeFragment({
          id: cache.identify(addedBook),  // e.g. "Book:123"
          fragment: gql`
            fragment NewBook on Book {
              id
              title
              categories {
                id
                name
              }
            }
          `,
          data: addedBook,
        });
        
        // 2. Append that Reference to the existing list
        return [...existingRefs, newBookRef];
      }
    }
  });
};

// APPROACH 4: Simple cache.modify with toReference (naive approach)
export const updateCacheWithSimpleToReference = (cache: ApolloCache<any>, addedBook: any) => {
  // This approach doesn't handle parameterized queries correctly
  cache.modify({
    fields: {
      books(existingBooks = [], { toReference }) {
        // Simply add the new book reference to all books lists
        // ISSUE: Will add to ALL lists, even those that should filter it out
        return [...existingBooks, toReference(addedBook)];
      },
    },
  });
};

// APPROACH 5: Advanced cache.modify with parameter filtering
export const updateCacheWithCategoryFiltering = (cache: ApolloCache<any>, addedBook: any) => {
  cache.modify({
    fields: {
      books(existingBooks = [], { toReference, storeFieldName }) {
        // Extract filter parameters from the store field name
        const { filter } =
          (getParamsFromStoreFieldName(storeFieldName) as StoreParams) ||
          {};
          
        // Only add to categories book belongs to
        const doesMatch = (filter?.categoryIds ?? []).some(
          (cId) => addedBook.categories?.some((c: any) => c.id === cId),
        );

        if (!filter?.categoryIds?.length || doesMatch) {
          return [...existingBooks, toReference(addedBook)];
        } else {
          return existingBooks;
        }
      },
    },
  });
};

// APPROACH 6: updateQuery with variables (specific category updates)
export const updateCachePerCategoryQuery = (cache: ApolloCache<any>, addedBook: any) => {
  // 1. First update the main books query with no filters
  cache.updateQuery<{ books: any[] }>(
    { query: GET_BOOKS, variables: { filter: null } },
    (existingData) => ({
      books: [...(existingData?.books || []), addedBook]
    })
  );
  
  // 2. Then update each category query that this book belongs to
  if (addedBook.categories) {
    // For each category this book belongs to
    addedBook.categories.forEach((category: any) => {
      // Update the specific category query
      cache.updateQuery<{ books: any[] }>(
        { 
          query: GET_BOOKS,
          variables: { filter: { categoryIds: [category.id] }}
        },
        (existingData) => {
          if (existingData) {
            return {
              books: [...(existingData.books || []), addedBook]
            };
          }
          return existingData;
        }
      );
    });
  }
};

