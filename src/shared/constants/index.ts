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
  // Тип публикации (printType parameter)
  printType: [
    { value: 'all', label: 'Все типы' },
    { value: 'books', label: 'Только книги' },
    { value: 'magazines', label: 'Только журналы' },
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

// Сообщения
export const MESSAGES = {
  errors: {
    booksLoadFailed: 'Не удалось загрузить книги. Попробуйте позже',
    bookLoadFailed: 'Ошибка при загрузке книги',
    networkError: 'Ошибка сети. Проверьте подключение к интернету',
  },
  ui: {
    noCover: 'Нет обложки',
    noAuthor: 'Автор не указан',
    noPublisher: 'Не указан',
    noAuthors: 'Не указаны',
    loadingBooks: 'Загрузка книг...',
    noBooksFound: 'Книги не найдены',
    tryDifferentQuery: 'Попробуйте изменить поисковый запрос',
    enterSearchQuery: 'Введите поисковый запрос, чтобы найти книги',
    searchPlaceholder: 'Введите название книги, автора или ключевые слова...',
    favoritesEmpty: 'У вас пока нет избранных книг. Найдите интересные книги и добавьте их в избранное!',
    // Новые сообщения для фильтров
    filterContentType: 'Тип доступа',
    filterPrintType: 'Тип публикации',
    filterOrderBy: 'Сортировка',
    filterLanguage: 'Язык',
  },
} as const;

// Классы CSS
export const CSS_CLASSES = {
  bookCard: 'border rounded-lg p-4 hover:shadow-lg transition-shadow',
  bookImage: 'aspect-[3/4] mb-4 bg-gray-100 rounded flex items-center justify-center',
  bookTitle: 'font-semibold text-lg mb-2 line-clamp-2',
  bookAuthor: 'text-gray-600 text-sm mb-2',
  bookDescription: 'text-gray-500 text-sm line-clamp-3',
  searchInput: 'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  filterSelect: 'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  errorMessage: 'text-red-500 mb-4 p-4 bg-red-50 rounded-lg',
  loadingSpinner: 'inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500',
  favoritesBadge: 'absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center',
} as const; 