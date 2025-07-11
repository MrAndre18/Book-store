import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Введите название книги, автора или ключевые слова...',
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-300'
        size={20}
      />
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full pl-10 pr-4 py-2 rounded-lg !border !border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:!border-blue-500 transition-colors hover:!border-gray-600'
      />
    </div>
  );
};
