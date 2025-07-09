import { AxiosResponse } from 'axios'
import { $api } from '@shared/api'
import { API_ENDPOINTS } from '@shared/constants'
import { IBook } from '@entities/book'

export const getBook = async (bookId: string): Promise<IBook[]> => {
  const response: AxiosResponse<IBook[]> = await $api.get(API_ENDPOINTS.getBooks + `/${bookId}`, {
    responseType: 'json',
    transformResponse: [(raw) => JSON.parse(raw)],
  })

  return response.data
}
