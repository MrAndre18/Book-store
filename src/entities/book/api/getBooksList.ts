import { AxiosResponse } from 'axios';
import { $api } from '@shared/api';
import { API_ENDPOINTS, API_LIMITS } from '@shared/constants';
import { IBookCard } from '@entities/book';
import { FilterValues } from '@shared/ui/filter-group/ui/FilterGroup';

interface BooksListParams {
  q: string;
  startIndex: number;
  maxResults: number;
  filter?: string;
  printType?: string;
  orderBy?: string;
  langRestrict?: string;
  fields?: string;
}

export const getBooksList = async (
  query: string,
  filters: FilterValues,
  page: number = 0
): Promise<IBookCard[]> => {
  const params: BooksListParams = {
    q: query,
    startIndex: page * API_LIMITS.booksPerRequest,
    maxResults: API_LIMITS.booksPerRequest,
    fields: 'items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/description,volumeInfo/imageLinks/medium,volumeInfo/imageLinks/large,volumeInfo/imageLinks/small,volumeInfo/imageLinks/thumbnail,volumeInfo/imageLinks/smallThumbnail)'
  };

  // Добавляем фильтры только если они заданы
  if (filters.filter) {
    params.filter = filters.filter;
  }

  if (filters.printType && filters.printType !== 'all') {
    params.printType = filters.printType;
  }

  if (filters.orderBy && filters.orderBy !== 'relevance') {
    params.orderBy = filters.orderBy;
  }

  if (filters.langRestrict) {
    params.langRestrict = filters.langRestrict;
  }

  const response: AxiosResponse<{ items: any[] }> = await $api.get(API_ENDPOINTS.getBooks, {
    params,
    responseType: 'json',
  });

  const books = (response.data.items || []).map((item) => {
    const images = item.volumeInfo?.imageLinks || {};
    const image = images.medium || images.large || images.small || images.thumbnail || images.smallThumbnail || null;
    return {
      id: item.id,
      title: item.volumeInfo?.title ?? null,
      description: item.volumeInfo?.description ?? null,
      authors: item.volumeInfo?.authors ?? null,
      image,
    };
  });

  return books;
};
