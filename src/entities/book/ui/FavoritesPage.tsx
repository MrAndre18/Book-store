import React from 'react';
import { useBooksQuery } from '../hooks/useBooksQuery';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites } = useBooksQuery();

  if (favorites.length === 0) {
    return (
      <div className='p-8 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Избранное</h2>
        <p className='text-gray-500'>
          У вас пока нет избранных книг. Найдите интересные книги и добавьте их
          в избранное!
        </p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-6'>
        Избранное ({favorites.length})
      </h2>

      <div className='grid gap-4'>
        {favorites.map(book => (
          <div key={book.id} className='border p-4 rounded'>
            <div className='flex justify-between items-start'>
              <div className='flex-1'>
                <h3 className='font-bold'>{book.volumeInfo.title}</h3>
                <p className='text-gray-600'>
                  Авторы: {book.volumeInfo.authors?.join(', ') || 'Не указаны'}
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
                onClick={() => removeFromFavorites(book.id)}
                className='ml-4 p-2 rounded bg-red-500 text-white hover:bg-red-600'
                title='Удалить из избранного'>
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
