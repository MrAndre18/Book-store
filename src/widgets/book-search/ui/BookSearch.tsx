import React from 'react';
import { SearchInput, CategoryFilter } from '@shared/ui';
import { MESSAGES } from '@shared/constants';

interface BookSearchProps {
  query: string;
  filter: string;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({
  query,
  filter,
  onQueryChange,
  onFilterChange,
}) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 mb-6'>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder={MESSAGES.ui.searchPlaceholder}
        className='flex-1'
      />
      <CategoryFilter value={filter} onChange={onFilterChange} />
    </div>
  );
};
