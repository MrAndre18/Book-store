import React from 'react';
import { Link } from 'react-router';
import { BookOpen, Heart } from 'lucide-react';
import { IBookCard } from '@entities/book';
import { routes } from '@shared/routes';

interface BookCardProps {
  book: IBookCard;
  onAddToFavorites?: (book: IBookCard) => void;
  onRemoveFromFavorites?: (bookId: string) => void;
  isFavorite?: boolean;
  isLast?: boolean;
  lastElementRef?: (node: HTMLDivElement | null) => void;
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
    e.stopPropagation();

    if (isFavorite && onRemoveFromFavorites) {
      onRemoveFromFavorites(book.id);
    } else if (!isFavorite && onAddToFavorites) {
      onAddToFavorites(book);
    }
  };

  return (
    <div
      ref={isLast ? lastElementRef : undefined}
      className='bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col relative group'>
      {onAddToFavorites && onRemoveFromFavorites && (
        <button
          onClick={handleFavoriteClick}
          className='absolute top-2 right-2 z-10 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors duration-200 group-hover:shadow-md'>
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      )}

      <Link
        to={`${routes.book.replace(':bookId', book.id)}`}
        className='block flex-1 p-4 xl:p-6'
        tabIndex={0}>
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
