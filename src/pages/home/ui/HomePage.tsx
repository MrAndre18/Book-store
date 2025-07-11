import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useBooksQuery } from '@entities/book';
import { BookSearch } from '@widgets/book-search';
import { BookList } from '@widgets/book-list';
import { API_LIMITS } from '@shared/constants';
import { IBookCard } from '@entities/book';
import { FilterValues } from '@shared/ui/filter-group/ui/FilterGroup';
import { FilterGroup } from '@shared/ui/filter-group';
import { toast } from 'react-toastify';

// Дефолтные фильтры
const defaultFilters: FilterValues = {
  filter: '',
  orderBy: 'relevance',
  langRestrict: '',
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<FilterValues>({
    filter: searchParams.get('filter') || defaultFilters.filter,
    orderBy: searchParams.get('orderBy') || defaultFilters.orderBy,
    langRestrict:
      searchParams.get('langRestrict') || defaultFilters.langRestrict,
  });

  // Основные состояния
  const [allBooks, setAllBooks] = useState<IBookCard[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isNewSearch, setIsNewSearch] = useState(false);

  const { searchBooks, booksLoading, booksError, lastBooksResult } =
    useBooksQuery();

  // Обновляем URL при изменении параметров поиска
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.filter) params.set('filter', filters.filter);
    if (filters.orderBy !== 'relevance') params.set('orderBy', filters.orderBy);
    if (filters.langRestrict) params.set('langRestrict', filters.langRestrict);
    setSearchParams(params);
  }, [query, filters, setSearchParams]);

  // Начинаем новый поиск при изменении запроса или фильтров
  useEffect(() => {
    if (query.trim()) {
      setAllBooks([]);
      setCurrentPage(0);
      setHasMore(true);
      setIsNewSearch(true);
    } else {
      setAllBooks([]);
      setCurrentPage(0);
      setHasMore(false);
      setIsNewSearch(false);
    }
  }, [query, filters]);

  // Выполняем поиск при новом поиске или при изменении страницы
  useEffect(() => {
    if (query.trim() && (isNewSearch || currentPage > 0)) {
      searchBooks(query.trim(), filters, currentPage);
      if (isNewSearch) {
        setIsNewSearch(false);
      }
    }
  }, [query, filters, currentPage, isNewSearch, searchBooks]);

  // Обрабатываем результаты поиска
  useEffect(() => {
    if (lastBooksResult) {
      const { books, page } = lastBooksResult;

      if (page === 0) {
        // Первая страница - заменяем все книги, но проверяем на дублирование (защита от StrictMode)
        setAllBooks(prev => {
          // Если предыдущий массив пустой или это действительно новый поиск, просто устанавливаем новые книги
          if (prev.length === 0) {
            return books;
          }
          // Иначе проверяем, не дублируются ли книги (защита от двойного вызова в StrictMode)
          const newBooksIds = new Set(books.map(book => book.id));
          const prevBooksIds = new Set(prev.map(book => book.id));
          const isDuplicate =
            books.length === prev.length &&
            books.every(book => prevBooksIds.has(book.id));

          return isDuplicate ? prev : books;
        });
      } else {
        // Следующие страницы - добавляем к существующим с дедупликацией
        setAllBooks(prev => {
          const existingIds = new Set(prev.map(book => book.id));
          const newBooks = books.filter(book => !existingIds.has(book.id));
          return [...prev, ...newBooks];
        });
      }

      // Определяем, есть ли еще страницы
      setHasMore(books.length === API_LIMITS.booksPerRequest);
    }
  }, [lastBooksResult]);

  // Показываем toast для пустого результата поиска
  useEffect(() => {
    if (
      lastBooksResult &&
      lastBooksResult.page === 0 &&
      lastBooksResult.books.length === 0 &&
      query.trim() &&
      !booksLoading
    ) {
      toast.info('Ничего не найдено по вашему запросу');
    }
  }, [lastBooksResult, query, booksLoading]);

  const handleLoadMore = () => {
    if (!booksLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Создаем строку описания активных фильтров
  const getFilterDescription = () => {
    const activeFilters = [];

    if (filters.filter) {
      const filterLabel =
        filters.filter === 'ebooks'
          ? 'электронные книги'
          : filters.filter === 'free-ebooks'
          ? 'бесплатные книги'
          : filters.filter === 'paid-ebooks'
          ? 'платные книги'
          : filters.filter === 'full'
          ? 'полный доступ'
          : filters.filter === 'partial'
          ? 'частичный доступ'
          : '';
      if (filterLabel) activeFilters.push(filterLabel);
    }

    if (filters.orderBy && filters.orderBy !== 'relevance') {
      const orderByLabel = filters.orderBy === 'newest' ? 'по новизне' : '';
      if (orderByLabel) activeFilters.push(orderByLabel);
    }

    if (filters.langRestrict) {
      const languageLabel =
        filters.langRestrict === 'ru'
          ? 'на русском'
          : filters.langRestrict === 'en'
          ? 'на английском'
          : '';
      if (languageLabel) activeFilters.push(languageLabel);
    }

    return activeFilters.length > 0 ? ` (${activeFilters.join(', ')})` : '';
  };

  return (
    <div className='py-8 mx-auto'>
      <h1 className='text-2xl font-semibold text-gray-900 !mb-6 tracking-tight'>
        Поиск книг
      </h1>
      <div className='flex flex-col xl:flex-row gap-8'>
        {/* Боковая панель фильтров */}
        <aside className='xl:w-96 w-full mb-4 xl:mb-0'>
          <FilterGroup values={filters} onChange={handleFiltersChange} />
        </aside>
        {/* Основная часть: поиск и результаты */}
        <section className='flex-1 min-w-0'>
          {/* Поиск */}
          <div className='mb-6'>
            <BookSearch query={query} onQueryChange={handleQueryChange} />
          </div>
          {/* Результаты поиска */}
          {query && (
            <div className='mb-2 mt-4'>
              <span className='text-gray-500 text-sm'>
                "{query}"{getFilterDescription()}
              </span>
            </div>
          )}
          {/* Список книг */}
          <BookList
            books={allBooks}
            loading={booksLoading}
            error={booksError}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            showFavorites={true}
          />
          {/* Начальное состояние */}
          {!query && !booksLoading && (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-base'>
                Введите запрос для поиска
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
