import React from 'react';
import { BookCover } from './BookCover';
import { BookActions } from './BookActions';

interface BookSidebarProps {
  imageUrl?: string;
  title?: string;
  averageRating?: number;
  bookId: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  buyLink?: string;
  previewLink?: string;
  pdfLink?: string;
}

export const BookSidebar: React.FC<BookSidebarProps> = ({
  imageUrl,
  title,
  averageRating,
  bookId,
  isFavorite,
  onToggleFavorite,
  buyLink,
  previewLink,
  pdfLink,
}) => {
  return (
    <aside className='w-full flex flex-col items-center gap-8 mb-4 lg:mb-0'>
      <BookCover
        imageUrl={imageUrl}
        title={title}
        averageRating={averageRating}
      />
      <BookActions
        bookId={bookId}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        buyLink={buyLink}
        previewLink={previewLink}
        pdfLink={pdfLink}
      />
    </aside>
  );
};
