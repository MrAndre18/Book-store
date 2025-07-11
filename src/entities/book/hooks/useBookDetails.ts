import { useState, useEffect, useCallback } from 'react';
import { IBookDetails } from '@entities/book';
import { getBookDetails } from '@entities/book/api';
import { MESSAGES } from '@shared/constants';

interface UseBookDetailsReturn {
  bookDetails: IBookDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBookDetails = (bookId: string): UseBookDetailsReturn => {
  const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookDetails = useCallback(async () => {
    if (!bookId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getBookDetails(bookId);
      if (result) {
        setBookDetails(result);
      } else {
        setError('Книга не найдена');
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      setError(err.message || MESSAGES.errors.bookLoadFailed || 'Ошибка загрузки книги');
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const refetch = useCallback(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  return {
    bookDetails,
    loading,
    error,
    refetch,
  };
}; 