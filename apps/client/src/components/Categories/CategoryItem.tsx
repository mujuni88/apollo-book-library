import React, { useState, FormEvent } from "react";
import { Category } from "../../lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";
import { Link } from "@heroui/react";
import { CategoryChip } from "./CategoryChip";

export const CategoryItem: React.FC<Category> = ({ id, name }) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <CategoryEditForm id={id} name={name} onFinish={() => setEdit(false)} />
  ) : (
    <CategoryInfo id={id} name={name} onEdit={() => setEdit(true)} />
  );
};

export const CategoryInfo: React.FC<Category & { onEdit: () => void }> = ({
  id,
  name,
  onEdit,
}) => {
  const { deleteCategory, loading } = useDeleteCategory();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    deleteCategory({ id });
  };

  return (
    <form
      className="grid grid-cols-[auto_1fr] items-center"
      onSubmit={handleDelete}
    >
      <CategoryChip category={{ id, name }} />
      <div className="gap-1 flex flex-end items-center justify-end">
        <button
          type="button"
          onClick={onEdit}
          disabled={loading}
          className="p-2 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PencilIcon size={16} />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </form>
  );
};

export const CategoryEditForm: React.FC<
  Category & { onFinish: () => void }
> = ({ id, name: _name, onFinish }) => {
  const [name, setName] = useState(_name);
  const { updateCategory, loading } = useUpdateCategory();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    await updateCategory({ id, name });
    onFinish();
  };

  return (
    <form
      className="grid grid-cols-2 gap-2 items-center"
      onSubmit={handleUpdate}
    >
      <div className="relative">
        <label htmlFor={`category-name-${id}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400 absolute -top-4 left-0">
          Name
        </label>
        <input
          type="text"
          id={`category-name-${id}`}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-1 py-1 text-sm bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:text-white"
        />
      </div>
      <div className="space-x-2 grid grid-cols-2">
        <button
          type="submit"
          disabled={!name || loading}
          className="px-4 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          type="button"
          onClick={() => {
            onFinish();
            setName(_name);
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
