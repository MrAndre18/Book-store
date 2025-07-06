import React, { useState } from 'react';
import { useBooksQuery } from '../hooks/useBooksQuery';

export const BookListSimple: React.FC = () => {
  const [query, setQuery] = useState('');
  const {
    books,
    booksLoading,
    booksError,
    searchBooks,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useBooksQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooks(query.trim());
    }
  };

  const handleFavoriteToggle = (book: any) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSearch} className='mb-4'>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Поиск книг...'
          className='border p-2 rounded mr-2'
        />
        <button
          type='submit'
          disabled={booksLoading}
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'>
          {booksLoading ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {booksError && (
        <div className='text-red-500 mb-4'>Ошибка: {booksError}</div>
      )}

      {booksLoading && <div className='text-gray-500 mb-4'>Загрузка...</div>}

      {books.length > 0 && (
        <div className='grid gap-4'>
          {books.map(book => (
            <div key={book.id} className='border p-4 rounded'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <h3 className='font-bold'>{book.volumeInfo.title}</h3>
                  <p className='text-gray-600'>
                    Авторы:{' '}
                    {book.volumeInfo.authors?.join(', ') || 'Не указаны'}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Издатель: {book.volumeInfo.publisher || 'Не указан'}
                  </p>
                  {book.volumeInfo.description && (
                    <p className='mt-2 text-sm'>
                      {book.volumeInfo.description.substring(0, 200)}...
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleFavoriteToggle(book)}
                  className={`ml-4 p-2 rounded ${
                    isFavorite(book.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                  {isFavorite(book.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!booksLoading && !booksError && books.length === 0 && query && (
        <div className='text-gray-500'>Книги не найдены</div>
      )}
    </div>
  );
};
