import React from 'react';
import { Filter } from 'lucide-react';
import { BOOK_CATEGORIES, CSS_CLASSES } from '@shared/constants';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Filter size={20} className='text-gray-400' />
      <select
        value={value}
        onChange={handleChange}
        className={CSS_CLASSES.filterSelect}>
        {BOOK_CATEGORIES.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
