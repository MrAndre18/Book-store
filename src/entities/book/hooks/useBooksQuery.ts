import { useState, useCallback, useRef } from 'react';
import { getBooksList, getBookById } from '../api';
import { IBookCard } from '../model/types';
import { MESSAGES } from '@shared/constants';
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
  currentBook: any;
  bookLoading: boolean;
  bookError: string | null;
  getBook: (id: string) => void;
}

export const useBooksQuery = (): UseBooksQueryReturn => {
  const [books, setBooks] = useState<IBookCard[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState<string | null>(null);
  const [lastBooksResult, setLastBooksResult] = useState<BooksQueryResult | null>(null);

  const [currentBook, setCurrentBook] = useState<any>(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  const requestCounterRef = useRef(0);
  const lastRequestRef = useRef<{ query: string; filters: FilterValues; page: number } | null>(null);

  const searchBooks = useCallback(async (query: string, filters: FilterValues, page: number = 0) => {
    if (!query.trim()) {
      setBooks([]);
      setLastBooksResult(null);
      lastRequestRef.current = null;
      return;
    }

    // Проверяем, не дублируется ли запрос (защита от React StrictMode)
    const currentRequest = { query: query.trim(), filters, page };
    if (lastRequestRef.current &&
      lastRequestRef.current.query === currentRequest.query &&
      JSON.stringify(lastRequestRef.current.filters) === JSON.stringify(currentRequest.filters) &&
      lastRequestRef.current.page === currentRequest.page) {
      // Запрос дублируется, пропускаем
      return;
    }

    lastRequestRef.current = currentRequest;
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
    } catch (error: unknown) {
      if (currentRequestId === requestCounterRef.current) {
        const err = error as { message?: string };
        setBooksError(err.message || MESSAGES.errors.booksLoadFailed);
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
    } catch (error: unknown) {
      const err = error as { message?: string };
      setBookError(err.message || MESSAGES.errors.bookLoadFailed);
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