import React from 'react';
import { Users, Star, Tag } from 'lucide-react';

interface BookHeaderProps {
  title?: string;
  authors?: string[];
  averageRating?: number;
  ratingsCount?: number;
  categories?: string[];
}

export const BookHeader: React.FC<BookHeaderProps> = ({
  title,
  authors,
  averageRating,
  ratingsCount,
  categories,
}) => {
  return (
    <header className='flex flex-col gap-3 w-full mb-2'>
      <h1 className='text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-1'>
        {title}
      </h1>

      {authors && (
        <div className='flex items-center gap-2 text-neutral-600 text-base'>
          <Users size={20} className='text-neutral-400' />
          <span>{authors.join(', ')}</span>
        </div>
      )}

      {averageRating && (
        <div className='flex items-center gap-2 text-yellow-500 text-sm font-medium'>
          <div className='flex items-center gap-1'>
            <Star size={16} fill='currentColor' />
            <span>{averageRating}</span>
          </div>
          {ratingsCount && (
            <span className='text-neutral-500 '>({ratingsCount} оценок)</span>
          )}
        </div>
      )}

      {categories && (
        <div className='flex flex-wrap gap-2 mt-1'>
          {categories.map((category, index) => (
            <span
              key={index}
              className='flex items-center gap-1 !px-2 !py-0.5 rounded bg-neutral-100  text-sm text-neutral-700 '>
              <Tag size={12} className='text-neutral-400 size-4' />
              {category}
            </span>
          ))}
        </div>
      )}
    </header>
  );
};
