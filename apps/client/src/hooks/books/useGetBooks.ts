import { gql, useQuery } from "@apollo/client";
import { Book, BookFilter, Category } from "../../lib/utils";
import { toast } from "sonner";
import { useMemo } from "react";

const GET_BOOKS = gql`
  query getBooks($filter: BookFilter) {
    books(filter: $filter) {
      id
      title
      categories {
        id
        name
      }
    }
  }
`;

type RawBookData = Omit<Book, 'categories'> & { categories?: Category[] };

type GetBooksData = {
  books: RawBookData[];
};

export const useGetBooks = (filter?: BookFilter) => {
  const { data, loading, error, refetch } = useQuery<GetBooksData>(
    GET_BOOKS,
    {
      variables: { filter },
      onError: (err) => {
        console.error("Error fetching books:", err);
        toast.error(`Error fetching books: ${err.message}`);
      },
    }
  );

  const books: Book[] = useMemo(() => {
    return data?.books?.map(rawBook => ({
      ...rawBook,
      categories: rawBook.categories ?? [],
    })) ?? [];
  }, [data]);

  return { books, loading, error, refetch };
};
