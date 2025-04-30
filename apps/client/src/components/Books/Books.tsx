import { BookItem } from "./BookItem/BookItem";
import { useGetBooks } from "../../hooks/books/useGetBooks";
import { AddBook } from "./AddBook";
import { CategoryDropdown } from "../CategoryDropdown";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { Spinner, Alert } from "@heroui/react";
import { useEffect, useState } from "react";

export function Books() {
  const { categories, loading: loadingCategories } = useGetCategories();
  const { books, loading, error, refetch } = useGetBooks();
  const isEmpty = !books.length && !loading && !error;
  const [selectedFilterCategoryId, setSelectedFilterCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const filter = selectedFilterCategoryId 
      ? { categoryIds: [selectedFilterCategoryId] } 
      : null;
    refetch({ filter });
  }, [selectedFilterCategoryId, refetch]);

  return (
    <div>
      <AddBook />
      <div className="mt-10 pt-10">
        <div className="grid grid-cols-[1fr_1fr] items-center gap-5 border-b-2 border-black-500 pb-5 mb-5">
          <h2 className="text-2xl">Books</h2>
          <CategoryDropdown
            placeholder="Filter by category"
            categories={categories}
            selectedCategory={selectedFilterCategoryId}
            onCategoryChange={setSelectedFilterCategoryId}
            className="w-full"
          />
        </div>
        {isEmpty ? (
          <Alert variant="solid" color="primary" className="my-4">
            No Books found. Add Books
          </Alert>
        ) : null}
        {loading ? <Spinner className="mx-auto" /> : null}
        {error ? (
          <Alert variant="solid" color="danger" className="my-4">
            Error loading books: {error.message}
          </Alert>
        ) : null}
        <ul className="w-full space-y-5">
          {books.map(({ id, title, categories }) => {
            return (
              <BookItem
                key={id}
                id={id}
                title={title}
                categories={categories}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
