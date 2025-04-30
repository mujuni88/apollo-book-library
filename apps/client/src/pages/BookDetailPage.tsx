// Placeholder for Book Detail Page
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBook } from '../hooks/books/useGetBook'; 
import { Card, CardBody, Badge } from '@heroui/react'; // Import HeroUI components

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const { book, loading, error } = useGetBook(bookId || '');

  if (!bookId) {
      return <p>No book ID provided.</p>;
  }

  if (loading) return <p className="text-center mt-8">Loading book details...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">Error loading book: {error.message}</p>;
  if (!book) return <p className="text-center mt-8">Book not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
       <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Library</Link>

      <Card className="mt-4">
        <CardBody>
            <h1 className="text-2xl font-semibold mb-4">{book.title}</h1>
            
            <div className="mb-3">
                <strong className="text-lg mr-2">Categories:</strong>
                {book.categories && book.categories.length > 0 ? (
                    <span className="flex flex-wrap gap-2 mt-1">
                        {book.categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/categories/${category.id}`}
                            >
                                <Badge 
                                    variant='solid' 
                                    color='primary' 
                                    className='cursor-pointer hover:opacity-80 transition-opacity'
                                >
                                    {category.name}
                                </Badge>
                            </Link>
                        ))}
                    </span>
                ) : (
                     <span className="text-gray-500 ml-1 inline">Not specified</span>
                )}
            </div>
        </CardBody>
      </Card>
    </div>
  );
};
