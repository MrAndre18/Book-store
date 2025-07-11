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
  // Форматируем дату публикации
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
      <div className='flex flex-col gap-3'>
        {publisher && (
          <div className='flex items-center gap-3 bg-neutral-100  rounded p-2'>
            <Award size={18} className='text-yellow-500' />
            <div>
              <p className='text-xs text-neutral-500 '>Издательство</p>
              <p className='text-base text-neutral-800  font-medium'>
                {publisher}
              </p>
            </div>
          </div>
        )}
        <div className='flex items-center gap-3 bg-neutral-100  rounded p-2'>
          <Calendar size={18} className='text-blue-400' />
          <div>
            <p className='text-xs text-neutral-500 '>Дата публикации</p>
            <p className='text-base text-neutral-800  font-medium'>
              {formatDate(publishedDate)}
            </p>
          </div>
        </div>
        {pageCount && (
          <div className='flex items-center gap-3 bg-neutral-100  rounded p-2'>
            <FileText size={18} className='text-purple-400' />
            <div>
              <p className='text-xs text-neutral-500 '>Количество страниц</p>
              <p className='text-base text-neutral-800  font-medium'>
                {pageCount}
              </p>
            </div>
          </div>
        )}
        {language && (
          <div className='flex items-center gap-3 bg-neutral-100  rounded p-2'>
            <Globe size={18} className='text-cyan-400' />
            <div>
              <p className='text-xs text-neutral-500 '>Язык</p>
              <p className='text-base text-neutral-800  font-medium'>
                {language}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
