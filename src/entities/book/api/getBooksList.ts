import { AxiosResponse } from 'axios'
import { $api } from '@shared/api'
import { API_ENDPOINTS, PAGINATION } from '@shared/constants'
import { IBook } from '@entities/book'

export const getBooksList = async (query: string, filter?: string, page: number = 0): Promise<IBook[]> => {
  const params: any = {
    q: query,
    startIndex: page * PAGINATION.defaultPageSize,
    maxResults: PAGINATION.defaultPageSize
  }

  if (filter) {
    params.q += `+subject:${filter}`
  }

  const response: AxiosResponse<{ items: IBook[] }> = await $api.get(API_ENDPOINTS.getBooks, {
    params,
    responseType: 'json',
  })

  return response.data.items || []
}
