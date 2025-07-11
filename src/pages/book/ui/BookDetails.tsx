import React from 'react';
import { FileText, Award, Calendar, Globe } from 'lucide-react';

interface BookDetailsProps {
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  publisher,
  publishedDate,
  pageCount,
  language,
}) => {
  /** Форматирует дату публикации */
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указана';

    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className='w-full mb-2'>
      <h2 className='flex items-center gap-2 text-lg font-semibold text-neutral-800 !mb-2'>
        <FileText size={20} className='text-green-400' />
        Детали
      </h2>
      <div className='grid grid-cols-1 gap-4 text-sm'>
        {publisher && (
          <div className='flex items-center gap-2'>
            <Award size={16} className='text-neutral-400' />
            <span className='text-neutral-600'>Издательство:</span>
            <span className='text-neutral-800'>{publisher}</span>
          </div>
        )}
        {publishedDate && (
          <div className='flex items-center gap-2'>
            <Calendar size={16} className='text-neutral-400' />
            <span className='text-neutral-600'>Дата публикации:</span>
            <span className='text-neutral-800'>
              {formatDate(publishedDate)}
            </span>
          </div>
        )}
        {pageCount && (
          <div className='flex items-center gap-2'>
            <FileText size={16} className='text-neutral-400' />
            <span className='text-neutral-600'>Страниц:</span>
            <span className='text-neutral-800'>{pageCount}</span>
          </div>
        )}
        {language && (
          <div className='flex items-center gap-2'>
            <Globe size={16} className='text-neutral-400' />
            <span className='text-neutral-600'>Язык:</span>
            <span className='text-neutral-800'>{language}</span>
          </div>
        )}
      </div>
    </section>
  );
};
