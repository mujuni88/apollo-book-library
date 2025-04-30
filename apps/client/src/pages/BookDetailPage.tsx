// Placeholder for Book Detail Page
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBook } from '../hooks/books/useGetBook'; 
import { CategoryChip } from '../components/Categories/CategoryChip'; // Import CategoryChip
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import icon

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const { book, loading, error } = useGetBook(bookId || '');

  if (!bookId) {
      return <p className="text-center mt-8 text-gray-500">No book ID provided.</p>;
  }

  if (loading) return <p className="text-center mt-8">Loading book details...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">Error loading book: {error.message}</p>;
  if (!book) return <p className="text-center mt-8 text-gray-500">Book not found.</p>;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <Link 
        to="/" 
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Library
      </Link>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{book.title}</h1>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Categories:</h2>
          {book.categories && book.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {book.categories.map((category) => (
                <CategoryChip key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 italic">Not specified</span>
          )}
        </div>
      </div>
    </div>
  );
};
