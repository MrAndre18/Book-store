import React from 'react';
import { Link } from 'react-router';
import { IBookCard } from '@entities/book';
import { Heart, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: IBookCard;
  onAddToFavorites?: (book: IBookCard) => void;
  onRemoveFromFavorites?: (bookId: string) => void;
  isFavorite?: boolean;
  isLast?: boolean;
  lastElementRef?: (node: HTMLDivElement) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite = false,
  isLast = false,
  lastElementRef,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite && onRemoveFromFavorites) {
      onRemoveFromFavorites(book.id);
    } else if (!isFavorite && onAddToFavorites) {
      onAddToFavorites(book);
    }
  };

  return (
    <div
      ref={isLast ? lastElementRef : undefined}
      className='relative bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:-translate-y-2 duration-200 transition-all flex flex-col h-full'
      data-testid='book-card'>
      {(onAddToFavorites || onRemoveFromFavorites) && (
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 lg:top-4 lg:right-4 z-10 p-1 lg:p-1.5 rounded-full border border-gray-400 bg-white transition-colors
            ${
              isFavorite
                ? 'text-red-500 border-red-200 bg-red-50'
                : 'text-gray-600 hover:text-red-400'
            }
          `}
          title={isFavorite ? 'Убрать из избранного' : 'В избранное'}>
          <Heart
            size={22}
            className='lg:w-[26px] lg:h-[26px] w-[22px] h-[22px]'
            fill={isFavorite ? '#ef4444' : 'none'}
            strokeWidth={1.7}
          />
        </button>
      )}

      <Link
        to={`/book/${book.id}`}
        className='block flex-1 p-4 xl:p-6'
        tabIndex={0}>
        {/* Book Cover */}
        <div className='w-full aspect-[1/1.2] bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center mb-2 lg:mb-3 overflow-hidden'>
          {book.image ? (
            <img
              src={book.image}
              alt={book.title || ''}
              className='object-cover w-full h-full'
              loading='lazy'
            />
          ) : (
            <BookOpen className='text-gray-200' size={28} />
          )}
        </div>

        {/* Book Info */}
        <div className='flex flex-col gap-1.5 lg:gap-2'>
          <h3 className='text-base lg:text-lg font-semibold text-gray-900 line-clamp-2 lg:line-clamp-3'>
            {book.title}
          </h3>
          <p className='text-xs lg:text-sm text-gray-400 line-clamp-1 lg:line-clamp-2'>
            {book.authors?.join(', ') || 'Автор не указан'}
          </p>
          {book.description && (
            <p className='text-sm lg:text-base text-gray-700 !mt-1.5 lg:!mt-2 line-clamp-2 lg:line-clamp-4'>
              {book.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};
