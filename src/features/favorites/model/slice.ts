import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavorite, IFavoritesState } from './types';
import { getFromLocalStorage, setToLocalStorage } from '@shared/utils/local-storage';
import { localStorageKeys } from '@shared/utils/local-storage/constants';

// Функция для загрузки избранного из localStorage
const loadFavoritesFromStorage = (): IFavorite[] => {
  const stored = getFromLocalStorage<string[]>(localStorageKeys.FAVORITES, []);

  console.log('Загружено из localStorage:', stored);

  if (!stored || !Array.isArray(stored)) {
    console.log('Некорректные данные в localStorage, возвращаем пустой массив');
    return [];
  }

  // Проверяем, что все элементы - строки
  const hasInvalidItems = stored.some(item => typeof item !== 'string');
  if (hasInvalidItems) {
    console.error('Обнаружены некорректные данные в localStorage:', stored);
    console.log('Очищаем localStorage и возвращаем пустой массив');
    setToLocalStorage(localStorageKeys.FAVORITES, []);
    return [];
  }

  // Конвертируем массив строк в массив объектов с датой
  const favorites = stored.map(id => ({
    id,
    addedAt: new Date().toISOString() // Используем текущую дату для старых записей
  }));

  console.log('Конвертированные favorites:', favorites);
  return favorites;
};

// Функция для сохранения в localStorage
const saveFavoritesToStorage = (favorites: IFavorite[]) => {
  const ids = favorites.map(fav => fav.id);
  console.log('Сохраняем в localStorage:', ids);
  setToLocalStorage(localStorageKeys.FAVORITES, ids);
};

const initialState: IFavoritesState = {
  favorites: loadFavoritesFromStorage(),
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const exists = state.favorites.some(favorite => favorite.id === bookId);
      if (!exists) {
        state.favorites.push({
          id: bookId,
          addedAt: new Date().toISOString(),
        });
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== bookId
      );
      saveFavoritesToStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage(state.favorites);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 