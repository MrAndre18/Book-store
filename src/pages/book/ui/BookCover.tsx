import React from 'react';
import { BookOpen, Star } from 'lucide-react';

interface BookCoverProps {
  imageUrl?: string;
  title?: string;
  averageRating?: number;
}

export const BookCover: React.FC<BookCoverProps> = ({
  imageUrl,
  title,
  averageRating,
}) => {
  return (
    <div className='flex flex-col items-center gap-3 w-full'>
      <div className='w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center border border-neutral-200'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className='object-cover w-full h-full'
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full'>
            <BookOpen size={48} className='text-neutral-300' />
          </div>
        )}
      </div>
    </div>
  );
};
