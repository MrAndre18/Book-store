import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { addToFavorites, removeFromFavorites, clearFavorites } from '../model/slice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const addToFavoritesHandler = useCallback((bookId: string) => {
    dispatch(addToFavorites(bookId));
  }, [dispatch]);

  const removeFromFavoritesHandler = useCallback((bookId: string) => {
    dispatch(removeFromFavorites(bookId));
  }, [dispatch]);

  const clearFavoritesHandler = useCallback(() => {
    dispatch(clearFavorites());
  }, [dispatch]);

  const isFavorite = useCallback((bookId: string) => {
    return favorites.some(favorite => favorite.id === bookId);
  }, [favorites]);

  const getFavoriteIds = useCallback(() => {
    return favorites.map(favorite => favorite.id);
  }, [favorites]);

  return {
    favorites,
    favoriteIds: getFavoriteIds(),
    addToFavorites: addToFavoritesHandler,
    removeFromFavorites: removeFromFavoritesHandler,
    clearFavorites: clearFavoritesHandler,
    isFavorite,
  };
}; 