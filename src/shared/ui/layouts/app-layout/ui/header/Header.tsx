import { Link } from 'react-router';
import { routes } from '@shared/routes';
import { Logo } from '@shared/ui/logo';
import { Heart } from 'lucide-react';
import { useFavorites } from '@features/favorites';
import { CSS_CLASSES } from '@shared/constants';
import classes from './index.module.scss';

const Header = () => {
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <header className={classes.header}>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Логотип */}
          <div className='flex items-center gap-2'>
            <Logo to={routes.home} />
            <span className='text-xl font-bold text-gray-800'>BookStore</span>
          </div>

          {/* Иконка избранного с бейджем */}
          <Link
            to={routes.favorites}
            className='relative p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <Heart size={24} className='text-gray-600' />
            {favoritesCount > 0 && (
              <span className={CSS_CLASSES.favoritesBadge}>
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
