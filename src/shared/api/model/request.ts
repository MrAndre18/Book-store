import axios, { AxiosError } from 'axios'
import { log } from './log'
import { ErrorResponse } from './type'
import { errorMap } from './errorMap'
import { ErrorEventEmitter, eventEmitter } from '@features/error-handler'
import { API_DOMAIN } from '@shared/constants'

const isProduction = false

// Создаем экземпляр Axios
export const $api = axios.create({
  baseURL: API_DOMAIN,
})

// const refreshToken = async () => {
//   const refreshToken = getFromLocalStorage(localStorageKeys.refresh_token)
//   const { data } = await $api.post('/auth/refresh', { refresh_token: refreshToken })

//   setToLocalStorage(localStorageKeys.access_token, data['access_token'])
//   setToLocalStorage(localStorageKeys.refresh_token, data['refresh_token'])

//   return data['access_token']
// }

// Интерцептор для запросов
$api.interceptors.request.use(
  async config => {
    // const token = getFromLocalStorage(localStorageKeys.ACCESS_TOKEN)
    config.headers['Content-Type']
    config.headers.Accept

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

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

// Интерцептор для ответов
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

// Обработка ошибок
const handleResponseError = (error: AxiosError<ErrorResponse>): void => {
  console.info('error', error)

  if (error.response?.status) {
    // Ошибки с HTTP статусом
    const status = error.response?.status
    const errorKey = `ERROR_${status}` as keyof typeof errorMap

    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: errorMap[errorKey] ? errorMap[errorKey] : `[${status}] Что-то пошло не так`
    }
    eventEmitter.emit('request-error', errorData)
  } else if (error.code === 'ERR_NETWORK' || error.code === 'ENOTFOUND') {
    // Сетевые ошибки (неправильный URL, нет интернета и т.д.)
    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: 'Ошибка сети. Проверьте подключение к интернету или правильность URL.'
    }
    eventEmitter.emit('request-error', errorData)
  } else {
    // Другие ошибки
    const errorData: ErrorEventEmitter = {
      action: 'toast',
      message: error.message || 'Произошла неизвестная ошибка'
    }
    eventEmitter.emit('request-error', errorData)
  }
}

// Логирование ошибок
const logErrorDetails = (error: AxiosError<ErrorResponse>): void => {
  log({
    name: axios.isAxiosError(error) ? (error.config?.url ?? 'undefined url') : 'Not instance of AxiosError',
    data: error,
    type: 'catch'
  })
}


