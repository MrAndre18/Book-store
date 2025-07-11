import { useFavoritesBooks } from '@features/favorites';
import { BookList } from '@widgets/book-list';

export const FavoritesPage = () => {
  const { favoritesBooks, loading, error } = useFavoritesBooks();

  return (
    <div className='py-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Избранные книги
        </h1>
        <p className='text-gray-600'>
          Ваши сохраненные книги ({favoritesBooks.length})
        </p>
      </div>

      <BookList
        books={favoritesBooks}
        loading={loading}
        error={error}
        onLoadMore={() => {}}
        hasMore={false}
        showFavorites={true}
      />

      {!loading && !error && favoritesBooks.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>
            У вас пока нет избранных книг. Найдите интересные книги и добавьте
            их в избранное!
          </p>
          <p className='text-gray-400 mt-2'>
            Найдите интересные книги на главной странице и добавьте их в
            избранное
          </p>
        </div>
      )}
    </div>
  );
};
