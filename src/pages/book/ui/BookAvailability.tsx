import React from 'react';
import { Clock, FileText } from 'lucide-react';

interface FormatInfo {
  isAvailable?: boolean;
}

interface AccessInfo {
  viewability?: string;
  epub?: FormatInfo;
  pdf?: FormatInfo;
}

interface BookAvailabilityProps {
  accessInfo?: AccessInfo;
}

export const BookAvailability: React.FC<BookAvailabilityProps> = ({
  accessInfo,
}) => {
  if (!accessInfo) return null;

  return (
    <section className='w-full mb-2'>
      <h2 className='flex items-center gap-2 text-lg font-semibold text-neutral-800 !mb-2'>
        <Clock size={20} className='text-orange-400' />
        Доступность
      </h2>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 bg-neutral-100  rounded p-2'>
          <span className='text-xs text-neutral-500 '>Доступность:</span>
          <span className='text-base text-neutral-800  font-medium'>
            {accessInfo.viewability}
          </span>
        </div>
        {accessInfo.epub?.isAvailable && (
          <div className='flex items-center gap-2 bg-neutral-100  rounded p-2'>
            <span className='text-xs text-neutral-500 '>EPUB формат:</span>
            <span className='flex items-center gap-1 text-base text-neutral-800  font-medium'>
              <FileText size={16} className='text-green-400' />
              Доступен
            </span>
          </div>
        )}
        {accessInfo.pdf?.isAvailable && (
          <div className='flex items-center gap-2 bg-neutral-100  rounded p-2'>
            <span className='text-xs text-neutral-500 '>PDF формат:</span>
            <span className='flex items-center gap-1 text-base text-neutral-800  font-medium'>
              <FileText size={16} className='text-blue-400' />
              Доступен
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
