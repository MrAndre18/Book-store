import { Link } from 'react-router';
import { routes } from '@shared/routes';

export const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] h-screen text-center px-4'>
      <div className='max-w-md'>
        <h1 className='text-8xl font-bold text-gray-300 !mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 !mb-4'>
          Страница не найдена
        </h2>
        <p className='text-gray-500 !mb-8'>
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
        <Link
          to={routes.home}
          className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'>
          На главную
        </Link>
      </div>
    </div>
  );
};
