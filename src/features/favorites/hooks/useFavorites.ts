import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '@app/store';
import { IBookCard } from '@entities/book';
import { addToFavorites, removeFromFavorites } from '../model/slice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const addToFavoritesHandler = useCallback((book: IBookCard) => {
    const isAlreadyFavorite = favorites.some(favorite => favorite.book.id === book.id);

    if (!isAlreadyFavorite) {
      dispatch(addToFavorites(book));
      toast.info('Книга добавлена в избранное');
    }
  }, [dispatch, favorites]);

  const removeFromFavoritesHandler = useCallback((bookId: string) => {
    const favoriteBook = favorites.find(favorite => favorite.book.id === bookId);

    if (favoriteBook) {
      dispatch(removeFromFavorites(bookId));
      toast.info('Книга удалена из избранного');
    }
  }, [dispatch, favorites]);

  const isFavorite = useCallback((bookId: string) => {
    return favorites.some(favorite => favorite.book.id === bookId);
  }, [favorites]);

  const getFavoriteIds = useCallback(() => {
    return favorites.map(favorite => favorite.book.id);
  }, [favorites]);

  const getFavoriteBooks = useCallback(() => {
    return favorites.map(favorite => favorite.book);
  }, [favorites]);

  return {
    favorites,
    favoriteIds: getFavoriteIds(),
    favoriteBooks: getFavoriteBooks(),
    favoritesCount: favorites.length,
    addToFavorites: addToFavoritesHandler,
    removeFromFavorites: removeFromFavoritesHandler,
    isFavorite,
  };
}; 