import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CategoryPage } from './pages/CategoryPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:bookId" element={<BookDetailPage />} />
      <Route path="/categories/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
};
