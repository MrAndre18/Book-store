// API константы
export const API_DOMAIN = 'https://www.googleapis.com/books/v1';
export const API_ENDPOINTS = {
  getBooks: '/volumes',
} as const;

// Константы для API запросов
export const API_LIMITS = {
  booksPerRequest: 10, // Количество книг, загружаемых за один запрос (Google Books API позволяет от 0 до 40)
} as const;

// Локальное хранилище ключи (используются утилиты из @shared/utils/local-storage)

// Пагинация (для совместимости)
export const PAGINATION = {
  defaultPageSize: API_LIMITS.booksPerRequest,
  maxPageSize: 40, // Максимальное значение для Google Books API
} as const;

// Фильтры для Google Books API
export const BOOK_FILTERS = {
  // Основной фильтр (filter parameter)
  contentType: [
    { value: '', label: 'Все книги' },
    { value: 'ebooks', label: 'Электронные книги' },
    { value: 'free-ebooks', label: 'Бесплатные книги' },
    { value: 'full', label: 'Полный доступ' },
    { value: 'paid-ebooks', label: 'Платные книги' },
    { value: 'partial', label: 'Частичный доступ' },
  ],
  // Сортировка (orderBy parameter)
  orderBy: [
    { value: 'relevance', label: 'По релевантности' },
    { value: 'newest', label: 'По новизне' },
  ],
  // Язык (langRestrict parameter)
  language: [
    { value: '', label: 'Все языки' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'Английский' },
  ],
} as const;

// Старые категории - оставляем для совместимости (можно удалить позже)
export const BOOK_CATEGORIES = BOOK_FILTERS.contentType;
