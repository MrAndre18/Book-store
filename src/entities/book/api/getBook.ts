import { AxiosResponse } from 'axios'
import { $api, apiUrls } from '@shared/api'
import { IBook } from '@entities/book'

export const getBook = async (bookId: string): Promise<IBook[]> => {
  const response: AxiosResponse<IBook[]> = await $api.get(apiUrls.getBooks + `/${bookId}`, {
    responseType: 'json',
    transformResponse: [(raw) => JSON.parse(raw)],
  })

  return response.data
}
