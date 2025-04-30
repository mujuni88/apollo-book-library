import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../lib/utils';

interface CategoryChipProps {
  category: Category;
}

export const CategoryChip: FC<CategoryChipProps> = ({ category }) => {
  return (
    <Link 
      key={category.id} // key is technically not needed here as it's handled in the parent map, but doesn't hurt
      to={`/categories/${category.id}`}
      className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
    >
      {category.name}
    </Link>
  );
};
