import React from 'react';
import { Search } from 'lucide-react';
import { CSS_CLASSES, MESSAGES } from '@shared/constants';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = MESSAGES.ui.searchPlaceholder,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
        size={20}
      />
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={CSS_CLASSES.searchInput}
      />
    </div>
  );
};
