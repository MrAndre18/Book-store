import { useState, useCallback } from 'react';
import { getBooksList, getBook } from '../api';
import { IBook } from '../model/types';
import { MESSAGES, PAGINATION } from '@shared/constants';

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
}

export const useBooksQuery = (): UseBooksQueryReturn => {
  // Состояние для списка книг
  const [books, setBooks] = useState<IBook[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState<string | null>(null);

  // Состояние для текущей книги
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  // Поиск книг с поддержкой фильтров и пагинации
  const searchBooks = useCallback(async (query: string, filter?: string, page: number = 0) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setBooksLoading(true);
    setBooksError(null);

    try {
      const result = await getBooksList(query.trim(), filter, page);

      // Если это первая страница, заменяем книги, иначе добавляем
      if (page === 0) {
        setBooks(result);
      } else {
        setBooks(prev => [...prev, ...result]);
      }
    } catch (error: any) {
      setBooksError(error.message || MESSAGES.errors.booksLoadFailed);
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
      setBookError(error.message || MESSAGES.errors.bookLoadFailed);
      setCurrentBook(null);
    } finally {
      setBookLoading(false);
    }
  }, []);

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
  };
}; 