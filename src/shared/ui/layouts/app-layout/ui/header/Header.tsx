import { Link } from 'react-router';
import { routes } from '@shared/routes';
// import { Logo } from '@shared/ui/logo'; // Удалено
import { Heart } from 'lucide-react';
import { useFavorites } from '@features/favorites';
import classes from './index.module.scss';

const Header = () => {
  const { favoritesCount } = useFavorites();

  return (
    <header className='bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm sticky top-0 z-30 transition-all'>
      <div className='container mx-auto px-6 py-3'>
        <div className='flex items-center justify-between'>
          {/* Название */}
          <Link
            to={routes.home}
            className='text-2xl font-semibold tracking-tight text-gray-900 select-none'>
            BookStore
          </Link>

          {/* Иконка избранного с бейджем */}
          <Link
            to={routes.favorites}
            className='relative p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <Heart size={24} className='text-gray-600' />
            {favoritesCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export { Header };
