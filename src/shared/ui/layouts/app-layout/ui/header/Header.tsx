import { Link } from 'react-router';
import { routes } from '@shared/routes';
import { Logo } from '@shared/ui/logo';
import { Heart } from 'lucide-react';
import { useBooksQuery } from '@entities/book';
import classes from './index.module.scss';

const Header = () => {
  const { getFavoritesCount } = useBooksQuery();
  const favoritesCount = getFavoritesCount();

  return (
    <header className={classes.header}>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Логотип */}
          <Link to={routes.home} className='flex items-center gap-2'>
            <Logo />
            <span className='text-xl font-bold text-gray-800'>BookStore</span>
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
