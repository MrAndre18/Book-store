import React from 'react';
import { SearchInput, CategoryFilter } from '@shared/ui';
import { BOOK_CATEGORIES, MESSAGES } from '@shared/constants';

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
    <div className='mb-8 space-y-4'>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder={MESSAGES.ui.searchPlaceholder}
      />

      <CategoryFilter value={filter} onChange={onFilterChange} />
    </div>
  );
};
