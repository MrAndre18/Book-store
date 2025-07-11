import { IBookCard } from '@entities/book';

// Структура избранной книги с полными данными
export interface IFavorite {
  book: IBookCard; // Полные данные книги
  addedAt: string; // ISO string даты добавления
}

export interface IFavoritesState {
  favorites: IFavorite[];
  loading: boolean;
  error: string | null;
} 