import { AxiosResponse } from 'axios';
import { $api } from '@shared/api';
import { API_DOMAIN, API_ENDPOINTS } from '@shared/constants';
import { IBook, IBookDetails } from '@entities/book';

// Получить одну книгу по ID
export const getBookById = async (bookId: string): Promise<IBook | null> => {
  try {
    const response: AxiosResponse<IBook> = await $api.get(`${API_DOMAIN}${API_ENDPOINTS.getBooks}/${bookId}`);
    return response.data;
  } catch {
    return null;
  }
};

// Получить детальную информацию о книге по ID
export const getBookDetails = async (bookId: string): Promise<IBookDetails | null> => {
  try {
    const response: AxiosResponse<IBookDetails> = await $api.get(`${API_ENDPOINTS.getBooks}/${bookId}`);
    return response.data;
  } catch {
    return null;
  }
};

// Получить массив книг по массиву ID (одновременные запросы, onBookLoaded для каждой)
export const getBooksByIds = async (
  bookIds: string[],
  onBookLoaded?: (book: IBook) => void
): Promise<IBook[]> => {
  if (bookIds.length === 0) {
    return [];
  }
  const results: IBook[] = [];
  await Promise.all(
    bookIds.map(async (id) => {
      const book = await getBookById(id);
      if (book) {
        results.push(book);
        if (onBookLoaded) onBookLoaded(book);
      }
    })
  );
  return results;
}; 