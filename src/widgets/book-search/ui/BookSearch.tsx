import React from 'react';
import { SearchInput } from '@shared/ui';

interface BookSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({
  query,
  onQueryChange,
}) => {
  return (
    <div className='mb-6'>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder={'Введите название книги, автора или ключевые слова...'}
        className='w-full'
      />
    </div>
  );
};
