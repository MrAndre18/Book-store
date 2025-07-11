/** API константы */
export const API_DOMAIN = 'https://www.googleapis.com/books/v1';
export const API_ENDPOINTS = {
  getBooks: '/volumes',
} as const;

/** Лимиты для API запросов */
export const API_LIMITS = {
  booksPerRequest: 10,
} as const;

/** Фильтры для Google Books API */
export const BOOK_FILTERS = {
  contentType: [
    { value: '', label: 'Все книги' },
    { value: 'ebooks', label: 'Электронные книги' },
    { value: 'free-ebooks', label: 'Бесплатные книги' },
    { value: 'full', label: 'Полный доступ' },
    { value: 'paid-ebooks', label: 'Платные книги' },
    { value: 'partial', label: 'Частичный доступ' },
  ],
  orderBy: [
    { value: 'relevance', label: 'По релевантности' },
    { value: 'newest', label: 'По новизне' },
  ],
  language: [
    { value: '', label: 'Все языки' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'Английский' },
  ],
} as const;
