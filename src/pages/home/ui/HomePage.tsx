import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { useBooksQuery } from '@entities/book';
import { Search, Filter } from 'lucide-react';

const filterOptions = [
  { value: '', label: 'Все категории' },
  { value: 'fiction', label: 'Художественная литература' },
  { value: 'nonfiction', label: 'Документальная литература' },
  { value: 'science', label: 'Наука' },
  { value: 'technology', label: 'Технологии' },
  { value: 'history', label: 'История' },
  { value: 'biography', label: 'Биографии' },
];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState(searchParams.get('filter') || '');
  const [page, setPage] = useState(0);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        },
        { threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const { searchBooks, books, booksLoading, booksError } = useBooksQuery();

  // Обновляем URL при изменении поиска или фильтра
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filter) params.set('filter', filter);
    setSearchParams(params);
  }, [query, filter, setSearchParams]);

  // Поиск при изменении параметров
  useEffect(() => {
    if (query.trim()) {
      setAllBooks([]);
      setPage(0);
      setHasMore(true);
      searchBooks(query.trim(), filter, 0);
    } else {
      setAllBooks([]);
      setHasMore(false);
    }
  }, [query, filter, searchBooks]);

  // Загрузка следующей страницы
  useEffect(() => {
    if (page > 0 && query.trim()) {
      searchBooks(query.trim(), filter, page);
    }
  }, [page, query, filter, searchBooks]);

  // Добавляем новые книги к списку
  useEffect(() => {
    if (books.length > 0) {
      setAllBooks(prev => [...prev, ...books]);
      setHasMore(books.length === 10); // Предполагаем, что API возвращает по 10 книг
    }
  }, [books]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className='py-6'>
      {/* Заголовок */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Поиск книг</h1>
        <p className='text-gray-600'>Найдите интересные книги в Google Books</p>
      </div>

      {/* Поиск и фильтры */}
      <div className='mb-8 space-y-4'>
        {/* Поиск */}
        <div className='relative'>
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='text'
            value={query}
            onChange={handleSearchChange}
            placeholder='Введите название книги, автора или ключевые слова...'
            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* Фильтр */}
        <div className='flex items-center gap-2'>
          <Filter size={20} className='text-gray-400' />
          <select
            value={filter}
            onChange={handleFilterChange}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Результаты поиска */}
      {query && (
        <div className='mb-4'>
          <p className='text-gray-600'>
            Результаты поиска по запросу:{' '}
            <span className='font-semibold'>"{query}"</span>
            {filter && (
              <>
                {' '}
                с фильтром:{' '}
                <span className='font-semibold'>
                  "{filterOptions.find(f => f.value === filter)?.label}"
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Ошибка */}
      {booksError && (
        <div className='text-red-500 mb-4 p-4 bg-red-50 rounded-lg'>
          Ошибка: {booksError}
        </div>
      )}

      {/* Список книг */}
      {allBooks.length > 0 && (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {allBooks.map((book, index) => (
            <div
              key={`${book.id}-${index}`}
              ref={index === allBooks.length - 1 ? lastBookElementRef : null}
              className='border rounded-lg p-4 hover:shadow-lg transition-shadow'>
              <div className='aspect-[3/4] mb-4 bg-gray-100 rounded flex items-center justify-center'>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className='w-full h-full object-cover rounded'
                  />
                ) : (
                  <span className='text-gray-400'>Нет обложки</span>
                )}
              </div>

              <h3 className='font-semibold text-lg mb-2 line-clamp-2'>
                {book.volumeInfo.title}
              </h3>

              <p className='text-gray-600 text-sm mb-2'>
                {book.volumeInfo.authors?.join(', ') || 'Автор не указан'}
              </p>

              {book.volumeInfo.description && (
                <p className='text-gray-500 text-sm line-clamp-3'>
                  {book.volumeInfo.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Загрузка */}
      {booksLoading && (
        <div className='text-center py-8'>
          <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
          <p className='mt-2 text-gray-600'>Загрузка книг...</p>
        </div>
      )}

      {/* Нет результатов */}
      {!booksLoading && query && allBooks.length === 0 && !booksError && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Книги не найдены</p>
          <p className='text-gray-400'>Попробуйте изменить поисковый запрос</p>
        </div>
      )}

      {/* Начальное состояние */}
      {!query && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>
            Введите поисковый запрос, чтобы найти книги
          </p>
        </div>
      )}
    </div>
  );
};
