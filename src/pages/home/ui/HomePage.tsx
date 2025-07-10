import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useBooksQuery } from '@entities/book';
import { BookSearch } from '@widgets/book-search';
import { BookList } from '@widgets/book-list';
import { MESSAGES, PAGINATION, BOOK_CATEGORIES } from '@shared/constants';
import { IBook } from '@entities/book';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState(searchParams.get('filter') || '');
  const [page, setPage] = useState(0);
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { searchBooks, books, booksLoading, booksError } = useBooksQuery();

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filter) params.set('filter', filter);
    setSearchParams(params);
  }, [query, filter, setSearchParams]);

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

  useEffect(() => {
    if (page > 0 && query.trim()) {
      searchBooks(query.trim(), filter, page);
    }
  }, [page, query, filter, searchBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setAllBooks(prev => [...prev, ...books]);
      setHasMore(books.length === PAGINATION.defaultPageSize);
    }
  }, [books]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className='py-6'>
      {/* Заголовок */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Поиск книг</h1>
        <p className='text-gray-600'>Найдите интересные книги в Google Books</p>
      </div>

      {/* Поиск и фильтры */}
      <BookSearch
        query={query}
        filter={filter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />

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
                  "{BOOK_CATEGORIES.find(f => f.value === filter)?.label}"
                </span>
              </>
            )}
          </p>
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
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>
            {MESSAGES.ui.enterSearchQuery}
          </p>
        </div>
      )}
    </div>
  );
};
