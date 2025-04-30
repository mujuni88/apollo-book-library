import { useState } from "react";
import { CategoryDropdown } from "../CategoryDropdown";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { useAddBook } from "../../hooks/books/useAddBook";

export function AddBook() {
  const [title, setTitle] = useState("");
  const { categories, loading } = useGetCategories();
  const { addBook } = useAddBook();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const selectedCategoryObject = categories.find(c => c.id === selectedCategoryId);
  const categoriesPayload = selectedCategoryObject ? [{ id: selectedCategoryObject.id, name: selectedCategoryObject.name }] : [];

  return (
    <div className="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6">
      <h2 className="text-xl font-semibold mb-8 text-gray-800 dark:text-white">Add A Book</h2>
      <form
        className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          addBook({
            variables: { title, categories: categoriesPayload }, 
            optimisticResponse: {
              addBook: {
                id: "temp-id",
                __typename: "Book",
                title,
                categories: categoriesPayload, 
              },
            },
          });
          setTitle("");
          setSelectedCategoryId(null); 
        }}
      >
        <div className="relative">
          <label htmlFor="book-title-add" className="block text-xs font-medium text-gray-500 dark:text-gray-400 absolute -top-4 left-0">Title</label>
          <input
            type="text"
            id="book-title-add"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            className="w-full px-1 py-1 text-sm bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:text-white"
          />
        </div>
        <CategoryDropdown
          placeholder="Select category"
          categories={categories}
          selectedCategory={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
        <button
          type="submit"
          disabled={!title || loading}
          className="px-4 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed self-end"
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
