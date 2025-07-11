import { useState, useCallback, useRef } from 'react';
import { getBooksList, getBookById } from '../api';
import { IBookCard, IBook } from '../model/types';
import { FilterValues } from '@shared/ui/filter-group/ui/FilterGroup';

interface BooksQueryResult {
  books: IBookCard[];
  page: number;
  requestId: number;
}

interface UseBooksQueryReturn {
  books: IBookCard[];
  booksLoading: boolean;
  booksError: string | null;
  searchBooks: (query: string, filters: FilterValues, page?: number) => void;
  lastBooksResult: BooksQueryResult | null;
  currentBook: IBook | null;
  bookLoading: boolean;
  bookError: string | null;
  getBook: (id: string) => void;
}

export const useBooksQuery = (): UseBooksQueryReturn => {
  const [books, setBooks] = useState<IBookCard[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState<string | null>(null);
  const [lastBooksResult, setLastBooksResult] = useState<BooksQueryResult | null>(null);

  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  const requestCounterRef = useRef(0);
  const lastRequestRef = useRef<string | null>(null);

  const searchBooks = useCallback(async (query: string, filters: FilterValues, page: number = 0) => {
    if (!query.trim()) {
      setBooks([]);
      setLastBooksResult(null);
      lastRequestRef.current = null;
      return;
    }

    // Создаем уникальный идентификатор запроса из всех параметров
    const requestKey = JSON.stringify({
      query: query.trim(),
      filter: filters.filter,
      orderBy: filters.orderBy,
      langRestrict: filters.langRestrict,
      page
    });

    // Проверяем, является ли запрос дубликатом предыдущего
    if (lastRequestRef.current === requestKey) {
      return;
    }

    lastRequestRef.current = requestKey;
    const currentRequestId = ++requestCounterRef.current;

    setBooksLoading(true);
    setBooksError(null);

    try {
      const result = await getBooksList(query.trim(), filters, page);

      if (currentRequestId === requestCounterRef.current) {
        setBooks(result);
        setLastBooksResult({
          books: result,
          page,
          requestId: currentRequestId,
        });
      }
    } catch {
      if (currentRequestId === requestCounterRef.current) {
        setBooksError("Не удалось загрузить книги. Попробуйте позже");
        if (page === 0) {
          setBooks([]);
          setLastBooksResult(null);
        }
      }
    } finally {
      if (currentRequestId === requestCounterRef.current) {
        setBooksLoading(false);
      }
    }
  }, []);

  const getBook = useCallback(async (id: string) => {
    setBookLoading(true);
    setBookError(null);

    try {
      const result = await getBookById(id);
      setCurrentBook(result);
    } catch {
      setBookError("Не удалось загрузить книги. Попробуйте позже");
      setCurrentBook(null);
    } finally {
      setBookLoading(false);
    }
  }, []);

  return {
    books,
    booksLoading,
    booksError,
    searchBooks,
    lastBooksResult,
    currentBook,
    bookLoading,
    bookError,
    getBook,
  };
}; 