import { AxiosResponse } from 'axios'
import { $api, apiUrls } from '@shared/api'
import { IBook } from '@entities/book'

export const getBooksList = async (query: string): Promise<IBook[]> => {
  const response: AxiosResponse<IBook[]> = await $api.get(apiUrls.getBooks, {
    params: {
      q: query
    },
    responseType: 'json',
    transformResponse: [(raw) => JSON.parse(raw)],
  })

  return response.data
}
