import React from 'react';
import { IBook } from '@entities/book';
import { BookCard, LoadingSpinner, ErrorMessage } from '@shared/ui';
import { useInfiniteScroll } from '@shared/hooks';
import { useFavorites } from '@features/favorites';
import { MESSAGES } from '@shared/constants';

interface BookListProps {
  books: IBook[];
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  showFavorites?: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  loading,
  error,
  onLoadMore,
  hasMore,
  showFavorites = true,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore,
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (books.length === 0 && !loading) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>{MESSAGES.ui.noBooksFound}</p>
        <p className='text-gray-400'>{MESSAGES.ui.tryDifferentQuery}</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book, index) => (
          <BookCard
            key={`${book.id}-${index}`}
            book={book}
            onAddToFavorites={showFavorites ? addToFavorites : undefined}
            onRemoveFromFavorites={
              showFavorites ? removeFromFavorites : undefined
            }
            isFavorite={showFavorites ? isFavorite(book.id) : false}
            isLast={index === books.length - 1}
            lastElementRef={lastElementRef}
          />
        ))}
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
};
