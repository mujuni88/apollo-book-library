// Placeholder for Category Page
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetCategory } from '../hooks/categories/useGetCategory';
import { useGetBooks } from '../hooks/books/useGetBooks';
import { BookItem } from '../components/Books/BookItem/BookItem'; 

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

  if (!categoryId) {
    return <p className="text-center mt-8 text-red-600">No Category ID provided in URL.</p>;
  }

  if (isLoading) return <p className="text-center mt-8">Loading category details...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">Error loading data: {error.message}</p>;
  if (!category) return <p className="text-center mt-8">Category not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Library</Link>

      <h1 className="text-3xl font-bold mb-6">Books in Category: {category.name}</h1>

      {books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <div className="space-y-2">
          {books.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
};
