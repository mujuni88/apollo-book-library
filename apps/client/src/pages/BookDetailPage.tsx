import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBook } from '../hooks/books/useGetBook'; 
import { CategoryChip } from '../components/Categories/CategoryChip';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Spinner, Alert } from '@heroui/react';

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const { book, loading, error } = useGetBook(bookId || '');

  if (!bookId) {
      return <Alert variant="flat" color="warning" className="max-w-md mx-auto mt-8">No book ID provided.</Alert>;
  }

  if (loading) return <Spinner className="mx-auto mt-8" />;
  if (error) return <Alert variant="solid" color="danger" className="max-w-md mx-auto mt-8">Error loading book: {error.message}</Alert>;
  if (!book) return <Alert variant="flat" color="secondary" className="max-w-md mx-auto mt-8">Book not found.</Alert>;

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
