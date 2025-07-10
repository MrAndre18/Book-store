import React from 'react';
import { IBook } from '@entities/book';
import { MESSAGES, CSS_CLASSES } from '@shared/constants';

interface BookCardProps {
  book: IBook;
  onAddToFavorites?: (bookId: string) => void;
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
  const handleFavoriteClick = () => {
    if (isFavorite && onRemoveFromFavorites) {
      onRemoveFromFavorites(book.id);
    } else if (!isFavorite && onAddToFavorites) {
      onAddToFavorites(book.id);
    }
  };

  return (
    <div
      ref={isLast ? lastElementRef : null}
      className={CSS_CLASSES.bookCard}
      data-testid='book-card'>
      <div className={CSS_CLASSES.bookImage}>
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            className='w-full h-full object-cover rounded'
          />
        ) : (
          <span className='text-gray-400'>{MESSAGES.ui.noCover}</span>
        )}
      </div>

      <h3 className={CSS_CLASSES.bookTitle}>{book.volumeInfo.title}</h3>

      <p className={CSS_CLASSES.bookAuthor}>
        {book.volumeInfo.authors?.join(', ') || MESSAGES.ui.noAuthor}
      </p>

      {book.volumeInfo.description && (
        <p className={CSS_CLASSES.bookDescription}>
          {book.volumeInfo.description}
        </p>
      )}

      {(onAddToFavorites || onRemoveFromFavorites) && (
        <button
          onClick={handleFavoriteClick}
          className='mt-3 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors'
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
};
