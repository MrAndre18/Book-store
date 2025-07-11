import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookDescriptionProps {
  description?: string;
}

export const BookDescription: React.FC<BookDescriptionProps> = ({
  description,
}) => {
  if (!description) return null;

  return (
    <section className='w-full mb-2'>
      <h2 className='flex items-center gap-2 text-lg font-semibold text-neutral-800 !mb-2'>
        <BookOpen size={20} className='text-blue-400' />
        Описание
      </h2>
      <div
        className='prose prose-neutral max-w-none text-base'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};
