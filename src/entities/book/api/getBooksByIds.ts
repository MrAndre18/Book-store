import { AxiosResponse } from 'axios';
import { $api } from '@shared/api';
import { API_DOMAIN, API_ENDPOINTS } from '@shared/constants';
import { IBook } from '@entities/book';

// Функция для получения одной книги по ID
const getBookById = async (bookId: string): Promise<IBook | null> => {
  try {
    const response: AxiosResponse<IBook> = await $api.get(`${API_DOMAIN}${API_ENDPOINTS.getBooks}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке книги:', bookId, error);
    return null;
  }
};

// Функция для получения нескольких книг по массиву ID
export const getBooksByIds = async (bookIds: string[]): Promise<IBook[]> => {
  if (bookIds.length === 0) {
    return [];
  }

  const books: IBook[] = [];

  // Загружаем книги последовательно
  for (const id of bookIds) {
    const book = await getBookById(id);
    if (book) {
      books.push(book);
    }
  }

  return books;
}; 