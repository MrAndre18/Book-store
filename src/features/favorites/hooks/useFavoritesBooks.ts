import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { IBook } from '@entities/book';
import { getBooksByIds } from '@entities/book';

export const useFavoritesBooks = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const favoriteIds = favorites.map(favorite => favorite.id);

  useEffect(() => {
    const loadBooks = async () => {
      if (favoriteIds.length === 0) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const loadedBooks = await getBooksByIds(favoriteIds);
        setBooks(loadedBooks);
      } catch (err) {
        setError('Не удалось загрузить избранные книги');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [favoriteIds.join(',')]); // Используем строку ID как зависимость

  return {
    favoritesBooks: books,
    loading,
    error,
  };
}; 