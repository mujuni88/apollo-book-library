import { useState } from "react";
import { CategoryDropdown } from "../CategoryDropdown";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { useAddBook } from "../../hooks/books/useAddBook";

export function AddBook() {
  const [title, setTitle] = useState("");
  const { categories, loading } = useGetCategories();
  const { addBook } = useAddBook();
  // State for single category ID, initialized to null
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  // Find the selected category object
  const selectedCategoryObject = categories.find(c => c.id === selectedCategoryId);
  // Prepare categories for mutation/optimistic response
  const categoriesPayload = selectedCategoryObject ? [{ id: selectedCategoryObject.id, name: selectedCategoryObject.name }] : [];

  return (
    <div>
      <form
        className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          addBook({
            // Use the prepared payload
            variables: { title, categories: categoriesPayload }, 
            optimisticResponse: {
              addBook: {
                id: "temp-id",
                __typename: "Book",
                title,
                // Use the prepared payload
                categories: categoriesPayload, 
              },
            },
          });
          setTitle("");
          // Reset single category ID state to null
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
          // label="Categories" // Temporarily removed
          placeholder="Select category" // Updated placeholder
          categories={categories}
          selectedCategory={selectedCategoryId} // Pass single ID state
          onCategoryChange={setSelectedCategoryId} // Pass state setter directly
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
