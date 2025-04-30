import { PencilIcon, TrashIcon } from "lucide-react";
import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../../lib/utils";
import { useDeleteBook } from "../../../hooks/books/useDeleteBook";
import { CategoryChip } from "../../Categories/CategoryChip";

export const BookInfo: React.FC<Book & { onEdit: () => void }> = ({
  id,
  title,
  categories,
  onEdit,
}) => {
  const { deleteBook, loading } = useDeleteBook();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    deleteBook({ id });
  };

  return (
    <div
      className="grid grid-cols-3 gap-2 items-center py-2 border-b border-gray-200 dark:border-gray-700"
    >
      <Link to={`/books/${id}`} className="text-blue-600 hover:underline font-medium truncate">
        {title}
      </Link>
      <div className="text-bold flex flex-wrap gap-1 items-center">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryChip key={category.id} category={category} />
          ))
        ) : (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            Uncategorized
          </span>
        )}
      </div>
      <div className="gap-1 flex flex-end items-center justify-end">
        <button
          type="button"
          onClick={onEdit}
          disabled={loading}
          className="p-2 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Edit ${title}`}
        >
          <PencilIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="p-2 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Delete ${title}`}
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
};
