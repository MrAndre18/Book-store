import { IBook } from '@entities/book';

export interface IFavorite {
  id: string;
  addedAt: string; // ISO string
}

export interface IFavoritesState {
  favorites: IFavorite[];
  loading: boolean;
  error: string | null;
}

// Тип для отображения избранного с полными данными книг
export interface IFavoriteWithBook extends IFavorite {
  book: IBook;
} 