import React from 'react';
import { Link } from 'react-router';
import { IBookCard } from '@entities/book';

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
    e.preventDefault(); // Предотвращаем навигацию при клике на кнопку
    if (isFavorite && onRemoveFromFavorites) {
      onRemoveFromFavorites(book.id);
    } else if (!isFavorite && onAddToFavorites) {
      onAddToFavorites(book);
    }
  };

  return (
    <div
      ref={isLast ? lastElementRef : null}
      className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col h-full'
      data-testid='book-card'>
      <Link to={`/book/${book.id}`} className='block flex-1'>
        <div className='w-full h-48 bg-gray-100 rounded flex items-center justify-center mb-3 overflow-hidden'>
          {book.image ? (
            <img
              src={book.image}
              alt={book.title || ''}
              className='w-full h-full object-cover rounded'
            />
          ) : (
            <span className='text-gray-300 text-sm'>Нет обложки</span>
          )}
        </div>
        <h3 className='text-base font-semibold text-gray-900 mb-1 line-clamp-2'>
          {book.title}
        </h3>
        <p className='text-xs text-gray-500 mb-2 line-clamp-1'>
          {book.authors?.join(', ') || 'Автор не указан'}
        </p>
        {book.description && (
          <p className='text-xs text-gray-400 line-clamp-3'>
            {book.description}
          </p>
        )}
      </Link>
      {(onAddToFavorites || onRemoveFromFavorites) && (
        <button
          onClick={handleFavoriteClick}
          className={`mt-2 ml-auto flex items-center justify-center w-8 h-8 rounded-full transition-colors border border-gray-200 hover:bg-gray-100 ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
          title={isFavorite ? 'Убрать из избранного' : 'В избранное'}>
          {isFavorite ? '❤' : '♡'}
        </button>
      )}
    </div>
  );
};
