import React, { FormEvent, useState } from "react";
import { Book } from "../../../lib/utils";
import { useGetCategories } from "../../../hooks/categories/useGetCategories";
import { useUpdateBook } from "../../../hooks/books/useUpdateBook";
import { CategoryDropdown } from "../../CategoryDropdown";

export const BookEditForm: React.FC<Book & { onFinish: () => void }> = ({
  id,
  title: _title,
  categories: _categories,
  onFinish,
}) => {
  const [title, setTitle] = useState(_title);
  const { categories, loading } = useGetCategories();
  const { updateBook } = useUpdateBook();
  const [selectedKeys, setSelectedKeys] = useState(
    () => new Set<string>((_categories ?? []).map((c) => c.id)),
  );
  const selectedCategories = categories
    .filter((c) => selectedKeys.has(c.id))
    .map(({ id, name }) => ({ id, name }));

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    await updateBook({ id, title, categories: selectedCategories });
    onFinish();
  };

  return (
    <form
      className="grid grid-cols-3 gap-2 items-center"
      onSubmit={handleUpdate}
    >
      <div className="relative">
        <label htmlFor={`book-title-${id}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400 absolute -top-4 left-0">Title</label>
        <input
          type="text"
          id={`book-title-${id}`}
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          className="w-full px-1 py-1 text-sm bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:text-white"
        />
      </div>
      <CategoryDropdown
        // label="Categories"
        placeholder="Select categories"
        categories={categories}
        selectedCategories={selectedKeys}
        onCategoryChange={setSelectedKeys}
      />
      <div className="space-x-2 grid grid-cols-2">
        <button
          type="submit"
          disabled={!title || loading}
          className="px-4 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          type="button"
          onClick={() => {
            onFinish();
            setTitle(_title);
            setSelectedKeys(new Set<string>((_categories ?? []).map((c) => c.id)));
          }}
          disabled={loading}
          className="px-4 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
