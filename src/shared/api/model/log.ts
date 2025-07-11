import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type Args = {
  name: string
  data: AxiosRequestConfig | AxiosResponse | AxiosError | unknown
  type: 'request' | 'response' | 'catch'
  payload?: unknown
}

const logStyles = {
  request: 'background: #1a1a1a; color: #00FFFF; padding: 2px 8px; border-radius: 4px; font-weight: bold;',
  response: 'background: #1a1a1a; color: #00FF00; padding: 2px 8px; border-radius: 4px; font-weight: bold;',
  catch: 'background: #1a1a1a; color: #dc3544; padding: 2px 8px; border-radius: 4px; font-weight: bold;',
  info: 'background: #1a1a1a; color: #FFA500; padding: 2px 8px; border-radius: 4px; font-weight: bold;',
  separator: 'background: #333; color: #fff; padding: 1px 4px; border-radius: 2px;'
}

const logEmojis = {
  request: '🚀',
  response: '📥',
  catch: '🚨',
  payload: '💾',
  time: '⏰',
  method: '🔧',
  status: '📊',
  headers: '📋',
  url: '🔗'
}

const formatTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString('ru-RU', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + `.${now.getMilliseconds().toString().padStart(3, '0')}`
}

const extractRequestInfo = (config: AxiosRequestConfig) => {
  return {
    method: config.method?.toUpperCase() || 'GET',
    url: config.url || '',
    headers: config.headers || {},
    data: config.data || null
  }
}

const extractResponseInfo = (response: AxiosResponse) => {
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers || {},
    data: response.data || null
  }
}

const extractErrorInfo = (error: AxiosError) => {
  return {
    message: error.message,
    code: error.code,
    status: error.response?.status,
    statusText: error.response?.statusText,
    method: error.config?.method?.toUpperCase(),
    url: error.config?.url,
    responseData: error.response?.data || null
  }
}

const log = ({ name, data, type, payload }: Args) => {
  if (!data) return

  const timestamp = formatTime()

  console.group(`%c${logEmojis[type]} API ${type.toUpperCase()} - ${timestamp}`, logStyles[type])

  console.log(`%c${logEmojis.url} Endpoint:`, logStyles.info, name)

  if (type === 'request' && 'method' in (data as AxiosRequestConfig)) {
    const requestInfo = extractRequestInfo(data as AxiosRequestConfig)
    console.log(`%c${logEmojis.method} Method:`, logStyles.info, requestInfo.method)
    console.log(`%c${logEmojis.url} URL:`, logStyles.info, requestInfo.url)

    if (requestInfo.headers) {
      console.log(`%c${logEmojis.headers} Headers:`, logStyles.info)
      console.log(requestInfo.headers)
    }

    if (requestInfo.data) {
      console.log(`%c${logEmojis.payload} Request Data:`, logStyles.info)
      console.log(requestInfo.data)
    }
  }

  if (type === 'response' && 'status' in (data as AxiosResponse)) {
    const responseInfo = extractResponseInfo(data as AxiosResponse)
    console.log(`%c${logEmojis.status} Status:`, logStyles.info, `${responseInfo.status} ${responseInfo.statusText}`)

    if (responseInfo.headers) {
      console.log(`%c${logEmojis.headers} Response Headers:`, logStyles.info)
      console.log(responseInfo.headers)
    }

    console.log(`%c${logEmojis.payload} Response Data:`, logStyles.info)
    console.log(responseInfo.data)
  }

  if (type === 'catch' && 'message' in (data as AxiosError)) {
    const errorInfo = extractErrorInfo(data as AxiosError)
    console.log(`%c${logEmojis.status} Error Status:`, logStyles.info, errorInfo.status || 'N/A')
    console.log(`%c${logEmojis.method} Error Method:`, logStyles.info, errorInfo.method || 'N/A')
    console.log(`%c${logEmojis.url} Error URL:`, logStyles.info, errorInfo.url || 'N/A')
    console.log(`%c🚨 Error Message:`, logStyles.info, errorInfo.message)
    console.log(`%c🔍 Error Code:`, logStyles.info, errorInfo.code || 'N/A')

    if (errorInfo.responseData) {
      console.log(`%c${logEmojis.payload} Error Response Data:`, logStyles.info)
      console.log(errorInfo.responseData)
    }
  }

  if (payload) {
    console.log(`%c${logEmojis.payload} Additional Payload:`, logStyles.info)
    console.log(payload)
  }

  console.log(`%c📋 Full ${type} data:`, logStyles.separator)
  console.log(data)

  console.groupEnd()
}

export { log }
