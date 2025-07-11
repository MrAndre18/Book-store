import { IBookCard } from '@entities/book';

/** Структура избранной книги */
export interface IFavorite {
  book: IBookCard;
  addedAt: string;
}

export interface IFavoritesState {
  favorites: IFavorite[];
  loading: boolean;
  error: string | null;
} 