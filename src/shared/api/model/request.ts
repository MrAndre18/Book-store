import axios, { AxiosError } from 'axios'
import { log } from './log'
import { ErrorResponse } from './type'
import { errorMap } from './errorMap'
import { ErrorEventEmitter, eventEmitter } from '@features/error-handler'
import { API_DOMAIN } from '@shared/constants'

const isProduction = false

/** Экземпляр Axios для API запросов */
export const $api = axios.create({
  baseURL: API_DOMAIN,
})

/** Интерцептор для запросов */
$api.interceptors.request.use(
  async config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json'

    if (!isProduction) {
      log({
        name: config.url ?? 'undefined url',
        data: config,
        type: 'request',
        payload: config.data
      })
    }
    return config
  },
  error => {
    throw error
  }
)

/** Интерцептор для ответов */
$api.interceptors.response.use(
  response => {
    if (!isProduction) {
      log({
        name: response.config.url ?? 'undefined url',
        data: response,
        type: 'response'
      })
    }
    return response
  },
  error => {
    handleResponseError(error as AxiosError<ErrorResponse>)
    logErrorDetails(error as AxiosError<ErrorResponse>)
    return Promise.reject(error)
  }
)

/** Обработка ошибок HTTP запросов */
const handleResponseError = (error: AxiosError<ErrorResponse>): void => {
  if (error.response?.status) {
    const status = error.response?.status
    const errorKey = `ERROR_${status}` as keyof typeof errorMap

    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: errorMap[errorKey] ? errorMap[errorKey] : `[${status}] Что-то пошло не так`
    }
    eventEmitter.emit('request-error', errorData)
  } else if (error.code === 'ERR_NETWORK' || error.code === 'ENOTFOUND') {
    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: 'Не удалось загрузить книги. Попробуйте позже'
    }
    eventEmitter.emit('request-error', errorData)
  } else {
    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: 'Не удалось загрузить книги. Попробуйте позже'
    }
    eventEmitter.emit('request-error', errorData)
  }
}

/** Логирование ошибок запросов */
const logErrorDetails = (error: AxiosError<ErrorResponse>): void => {
  log({
    name: axios.isAxiosError(error) ? (error.config?.url ?? 'undefined url') : 'Not instance of AxiosError',
    data: error,
    type: 'catch'
  })
}


