import React, { useEffect } from 'react';
import { IBookCard } from '@entities/book';
import { BookCard, LoadingSpinner } from '@shared/ui';
import { useInfiniteScroll } from '@shared/hooks';
import { useFavorites } from '@features/favorites';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (error) {
    return null;
  }

  if (books.length === 0 && !loading) {
    return null;
  }

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
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
