// Placeholder for Category Page
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetCategory } from '../hooks/categories/useGetCategory';
import { useGetBooks } from '../hooks/books/useGetBooks';
import { BookItem } from '../components/Books/BookItem/BookItem'; 
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Spinner, Alert } from '@heroui/react';

// Back link component that will be reused across all states
const BackLink = () => (
  <Link 
    to="/" 
    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors mb-6 group"
  >
    <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
    Back to Library
  </Link>
);

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Fetch Category Info (for name)
  const { category, loading: loadingCategory, error: errorCategory } = useGetCategory(categoryId || '');

  // Fetch Books for this Category
  const { books, loading: loadingBooks, error: errorBooks } = useGetBooks(
    categoryId ? { categoryIds: [categoryId] } : undefined
  );

  // Combined Loading State
  const isLoading = loadingCategory || loadingBooks;
  // Combined Error State (prioritize category error)
  const error = errorCategory || errorBooks;

  // Render content based on state
  const renderContent = () => {
    if (!categoryId) {
      return <Alert variant="flat" color="warning" className="max-w-md mx-auto">No Category ID provided in URL.</Alert>;
    }

    if (isLoading) return <Spinner className="mx-auto" />;
    if (error) return <Alert variant="solid" color="danger" className="max-w-md mx-auto">Error loading data: {error.message}</Alert>;
    if (!category) return <Alert variant="flat" color="secondary" className="max-w-md mx-auto">Category not found.</Alert>;

    return (
      <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Books in <span className="text-purple-600 dark:text-purple-400">{category.name}</span>
        </h1>

        {books.length === 0 ? (
          <Alert variant="flat" color="primary" className="max-w-md mx-auto">No books found in this category.</Alert>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
            <div className="space-y-3">
              {books.map((book) => (
                // Add padding-top to all but the first item for spacing with divide-y
                <div key={book.id} className="pt-3 first:pt-0">
                  <BookItem {...book} />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <BackLink />
      {renderContent()}
    </div>
  );
};
