import { useState, useCallback } from 'react';
import { getBooksList, getBook } from '../api';
import { IBook } from '../model/types';

interface UseBooksQueryReturn {
  // Список книг
  books: IBook[];
  booksLoading: boolean;
  booksError: string | null;
  searchBooks: (query: string, filter?: string, page?: number) => void;

  // Текущая книга
  currentBook: IBook | null;
  bookLoading: boolean;
  bookError: string | null;
  getBook: (id: string) => void;

  // Избранное (localStorage)
  favorites: IBook[];
  addToFavorites: (book: IBook) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  getFavoritesCount: () => number;
}

const FAVORITES_KEY = 'book_favorites';

const getFavorites = (): IBook[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setFavorites = (favorites: IBook[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const useBooksQuery = (): UseBooksQueryReturn => {
  // Состояние для списка книг
  const [books, setBooks] = useState<IBook[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState<string | null>(null);

  // Состояние для текущей книги
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  // Состояние для избранного
  const [favorites, setFavoritesState] = useState<IBook[]>(getFavorites);

  // Поиск книг с поддержкой фильтров и пагинации
  const searchBooks = useCallback(async (query: string, filter?: string, page: number = 0) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setBooksLoading(true);
    setBooksError(null);

    try {
      // Формируем поисковый запрос с фильтрами
      let searchQuery = query.trim();
      if (filter) {
        searchQuery += ` subject:${filter}`;
      }

      const result = await getBooksList(searchQuery);

      // Если это первая страница, заменяем книги, иначе добавляем
      if (page === 0) {
        setBooks(result);
      } else {
        setBooks(prev => [...prev, ...result]);
      }
    } catch (error: any) {
      setBooksError(error.message || 'Ошибка при поиске книг');
      if (page === 0) {
        setBooks([]);
      }
    } finally {
      setBooksLoading(false);
    }
  }, []);

  // Получение одной книги
  const getBookById = useCallback(async (id: string) => {
    setBookLoading(true);
    setBookError(null);

    try {
      const result = await getBook(id);
      setCurrentBook(result[0]); // getBook возвращает массив, берем первый элемент
    } catch (error: any) {
      setBookError(error.message || 'Ошибка при загрузке книги');
      setCurrentBook(null);
    } finally {
      setBookLoading(false);
    }
  }, []);

  // Работа с избранным
  const addToFavorites = useCallback((book: IBook) => {
    const newFavorites = [...favorites, book];
    setFavoritesState(newFavorites);
    setFavorites(newFavorites);
  }, [favorites]);

  const removeFromFavorites = useCallback((bookId: string) => {
    const newFavorites = favorites.filter(book => book.id !== bookId);
    setFavoritesState(newFavorites);
    setFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((bookId: string) => {
    return favorites.some(book => book.id === bookId);
  }, [favorites]);

  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  return {
    // Список книг
    books,
    booksLoading,
    booksError,
    searchBooks,

    // Текущая книга
    currentBook,
    bookLoading,
    bookError,
    getBook: getBookById,

    // Избранное
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount,
  };
}; 