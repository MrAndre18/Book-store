import React from 'react';
import { IBookCard } from '@entities/book';
import { BookCard, LoadingSpinner, ErrorMessage } from '@shared/ui';
import { useInfiniteScroll } from '@shared/hooks';
import { useFavorites } from '@features/favorites';

interface BookListProps {
  books: IBookCard[];
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
    return <ErrorMessage message={error} className='mb-6' />;
  }

  if (books.length === 0 && !loading) {
    return (
      <div className='text-center py-16'>
        <p className='text-gray-400 text-base'>Книги не найдены</p>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book, index) => (
          <BookCard
            key={book.id}
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
      {loading && <LoadingSpinner message='' />}
    </div>
  );
};
