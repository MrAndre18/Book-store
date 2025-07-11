import React from 'react';
import { Heart, ShoppingCart, Eye, Download } from 'lucide-react';

interface BookActionsProps {
  bookId: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  buyLink?: string;
  previewLink?: string;
  pdfLink?: string;
}

export const BookActions: React.FC<BookActionsProps> = ({
  isFavorite,
  onToggleFavorite,
  buyLink,
  previewLink,
  pdfLink,
}) => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <button
        onClick={onToggleFavorite}
        className='flex items-center cursor-pointer justify-center gap-2 px-4 py-2 h-11 rounded-lg border border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-500 hover:bg-neutral-50 transition-colors font-medium text-base whitespace-nowrap'>
        <span className='flex items-center gap-2'>
          <Heart
            size={18}
            fill={isFavorite ? 'currentColor' : 'none'}
            className='transition-colors text-red-500'
          />
          {isFavorite ? 'В избранном' : 'В избранное'}
        </span>
      </button>
      {buyLink && (
        <a
          href={buyLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center gap-2 px-4 py-2 h-11 rounded-lg border border-neutral-300 bg-transparent text-neutral-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium text-base whitespace-nowrap'>
          <span className='flex items-center gap-2'>
            <ShoppingCart size={18} />
            Купить книгу
          </span>
        </a>
      )}
      {previewLink && (
        <a
          href={previewLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center gap-2 px-4 py-2 h-11 rounded-lg border border-neutral-300 bg-transparent text-neutral-700 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-colors font-medium text-base whitespace-nowrap'>
          <span className='flex items-center gap-2'>
            <Eye size={18} />
            Читать онлайн
          </span>
        </a>
      )}
      {pdfLink && (
        <a
          href={pdfLink}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center gap-2 px-4 py-2 h-11 rounded-lg border border-neutral-300 bg-transparent text-neutral-700 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium text-base whitespace-nowrap'>
          <span className='flex items-center gap-2'>
            <Download size={18} />
            Скачать PDF
          </span>
        </a>
      )}
    </div>
  );
};
