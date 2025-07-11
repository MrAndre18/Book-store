import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { IBookCard } from '@entities/book';

export const useFavoritesBooks = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites);

  // Получаем книги напрямую из store, так как теперь храним полные данные
  const books: IBookCard[] = favorites.map(favorite => favorite.book);

  return {
    favoritesBooks: books,
    loading: false, // Данные уже загружены из localStorage
    error: null,
  };
}; 