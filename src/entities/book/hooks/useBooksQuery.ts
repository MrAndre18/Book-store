import { useState, useCallback } from 'react';
import { getBooksList, getBookById } from '../api';
import { IBook } from '../model/types';
import { MESSAGES } from '@shared/constants';

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
    } catch (error: unknown) {
      const err = error as { message?: string };
      setBooksError(err.message || MESSAGES.errors.booksLoadFailed);
      if (page === 0) {
        setBooks([]);
      }
    } finally {
      setBooksLoading(false);
    }
  }, []);

  // Получение одной книги по id
  const getBook = useCallback(async (id: string) => {
    setBookLoading(true);
    setBookError(null);

    try {
      const result = await getBookById(id);
      setCurrentBook(result);
    } catch (error: unknown) {
      const err = error as { message?: string };
      setBookError(err.message || MESSAGES.errors.bookLoadFailed);
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
    getBook,
  };
}; 