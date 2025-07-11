import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useBookDetails } from '@entities/book';
import { useFavorites } from '@features/favorites';
import { LoadingSpinner } from '@shared/ui/loading-spinner';
import { routes } from '@shared/routes';
import { BookSidebar } from './BookSidebar';
import { BookContent } from './BookContent';
import { toast } from 'react-toastify';

export const BookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { bookDetails, loading, error } = useBookDetails(bookId || '');
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] '>
        <div className='flex flex-col items-center gap-4 p-6 rounded-lg shadow-md '>
          <LoadingSpinner />
          <p className='text-neutral-700 dark:text-neutral-200 text-lg font-medium'>
            Загружаем книгу...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] '>
        <div className='flex flex-col items-center gap-4 p-6 rounded-lg shadow-md '>
          <Link
            to={routes.home}
            className='flex items-center gap-2 text-blue-600 hover:underline text-base font-medium'>
            <ArrowLeft size={20} />
            Вернуться к поиску
          </Link>
        </div>
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] '>
        <div className='flex flex-col items-center gap-4 p-6 rounded-lg shadow-md '>
          <div className='bg-blue-100 dark:bg-blue-900 p-4 rounded-full'>
            <BookOpen size={48} className='text-blue-500 dark:text-blue-300' />
          </div>
          <h2 className='text-xl font-semibold text-neutral-800 dark:text-neutral-100'>
            Книга не найдена
          </h2>
          <p className='text-neutral-600 dark:text-neutral-300 text-base'>
            Запрашиваемая книга не существует или недоступна.
          </p>
          <Link
            to={routes.home}
            className='flex items-center gap-2 text-blue-600 hover:underline text-base font-medium'>
            <ArrowLeft size={20} />
            Вернуться к поиску
          </Link>
        </div>
      </div>
    );
  }

  const { volumeInfo, saleInfo, accessInfo } = bookDetails;

  // Получаем лучшее доступное изображение
  const getBestImage = () => {
    const images = volumeInfo.imageLinks;
    return (
      images?.extraLarge ||
      images?.large ||
      images?.medium ||
      images?.small ||
      images?.thumbnail ||
      images?.smallThumbnail
    );
  };

  const handleFavoriteClick = () => {
    const bookCard = {
      id: bookDetails.id,
      title: volumeInfo.title || null,
      description: volumeInfo.description || null,
      authors: volumeInfo.authors || null,
      image: getBestImage() || null,
    };

    if (isFavorite(bookDetails.id)) {
      removeFromFavorites(bookDetails.id);
    } else {
      addToFavorites(bookCard);
    }
  };

  return (
    <section className='flex flex-col min-h-screen'>
      {/* Навигация */}
      <nav className='mb-4'>
        <Link
          to={routes.home}
          className='!flex items-center gap-2 text-neutral-600 hover:text-blue-600 transition-colors text-base font-medium'>
          <ArrowLeft size={18} />
          <span>Назад</span>
        </Link>
      </nav>
      <section className='flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto'>
        <aside className='w-full lg:w-1/3 flex-shrink-0'>
          <BookSidebar
            imageUrl={getBestImage()}
            title={volumeInfo.title}
            averageRating={volumeInfo.averageRating}
            bookId={bookDetails.id}
            isFavorite={isFavorite(bookDetails.id)}
            onToggleFavorite={handleFavoriteClick}
            buyLink={saleInfo?.buyLink}
            previewLink={volumeInfo.previewLink}
            pdfLink={accessInfo?.pdf?.acsTokenLink}
          />
        </aside>
        <div className='w-full lg:w-2/3'>
          <BookContent
            volumeInfo={volumeInfo}
            saleInfo={saleInfo}
            accessInfo={accessInfo}
          />
        </div>
      </section>
    </section>
  );
};
