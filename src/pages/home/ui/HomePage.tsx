import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useBooksQuery } from '@entities/book';
import { BookSearch } from '@widgets/book-search';
import { BookList } from '@widgets/book-list';
import { API_LIMITS, BOOK_FILTERS } from '@shared/constants';
import { IBookCard } from '@entities/book';
import { FilterValues } from '@shared/ui/filter-group/ui/FilterGroup';
import { FilterGroup } from '@shared/ui/filter-group';
import { toast } from 'react-toastify';

/** Значения фильтров по умолчанию */
const defaultFilters: FilterValues = {
  filter: '',
  orderBy: 'relevance',
  langRestrict: '',
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || 'JavaScript');
  const [filters, setFilters] = useState<FilterValues>({
    filter: searchParams.get('filter') || defaultFilters.filter,
    orderBy: searchParams.get('orderBy') || defaultFilters.orderBy,
    langRestrict:
      searchParams.get('langRestrict') || defaultFilters.langRestrict,
  });

  const [allBooks, setAllBooks] = useState<IBookCard[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isNewSearch, setIsNewSearch] = useState(false);

  const { searchBooks, booksLoading, booksError, lastBooksResult } =
    useBooksQuery();

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.filter) params.set('filter', filters.filter);
    if (filters.orderBy !== 'relevance') params.set('orderBy', filters.orderBy);
    if (filters.langRestrict) params.set('langRestrict', filters.langRestrict);
    setSearchParams(params);
  }, [query, filters, setSearchParams]);

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

  useEffect(() => {
    if (query.trim() && (isNewSearch || currentPage > 0)) {
      searchBooks(query.trim(), filters, currentPage);
      if (isNewSearch) {
        setIsNewSearch(false);
      }
    }
  }, [query, filters, currentPage, isNewSearch, searchBooks]);

  useEffect(() => {
    if (lastBooksResult) {
      const { books, page } = lastBooksResult;

      if (page === 0) {
        setAllBooks(prev => {
          if (prev.length === 0) {
            return books;
          }
          const prevBooksIds = new Set(prev.map(book => book.id));
          const isDuplicate =
            books.length === prev.length &&
            books.every(book => prevBooksIds.has(book.id));

          return isDuplicate ? prev : books;
        });
      } else {
        setAllBooks(prev => {
          const existingIds = new Set(prev.map(book => book.id));
          const newBooks = books.filter(book => !existingIds.has(book.id));
          return [...prev, ...newBooks];
        });
      }

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

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    if (!booksLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const getFilterDescription = () => {
    const parts = [];
    if (filters.filter) {
      const filterOption = BOOK_FILTERS.contentType.find(
        option => option.value === filters.filter
      );
      if (filterOption) parts.push(filterOption.label.toLowerCase());
    }
    if (filters.orderBy && filters.orderBy !== 'relevance') {
      const orderOption = BOOK_FILTERS.orderBy.find(
        option => option.value === filters.orderBy
      );
      if (orderOption) parts.push(orderOption.label.toLowerCase());
    }
    if (filters.langRestrict) {
      const langOption = BOOK_FILTERS.language.find(
        option => option.value === filters.langRestrict
      );
      if (langOption) parts.push(langOption.label.toLowerCase());
    }
    return parts.length > 0 ? ` (${parts.join(', ')})` : '';
  };

  useEffect(() => {
    if (booksError) {
      toast.error(booksError);
    }
  }, [booksError]);

  return (
    <div className='py-8 mx-auto'>
      <h1 className='text-2xl font-semibold text-gray-900 !mb-6 tracking-tight'>
        Поиск книг
      </h1>
      <div className='flex flex-col xl:flex-row gap-8'>
        <aside className='xl:w-96 w-full mb-4 xl:mb-0'>
          <FilterGroup values={filters} onChange={handleFiltersChange} />
        </aside>
        <section className='flex-1 min-w-0'>
          <div className='mb-6'>
            <BookSearch query={query} onQueryChange={handleQueryChange} />
          </div>
          {query && (
            <div className='mb-2 mt-4'>
              <span className='text-gray-500 text-sm'>
                "{query}"{getFilterDescription()}
              </span>
            </div>
          )}
          <BookList
            books={allBooks}
            loading={booksLoading}
            error={booksError}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            showFavorites={true}
          />
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
