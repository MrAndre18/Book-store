import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  imageUrl?: string;
  title?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ imageUrl, title }) => {
  return (
    <div className='w-full max-w-xs mx-auto'>
      <div className='w-full aspect-[3/4] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-md'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || 'Обложка книги'}
            className='object-cover w-full h-full'
            loading='lazy'
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
