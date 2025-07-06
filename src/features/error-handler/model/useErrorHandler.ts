import { useEffect } from "react"
import { eventEmitter } from "./eventEmitter"
import { ErrorEventEmitter } from "./type"
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  useEffect(() => {
    eventEmitter.on('request-error', handleRequestError)
    return () => {
      eventEmitter.off('request-error', handleRequestError)
    }
  }, [])

  const handleRequestError = (error: ErrorEventEmitter) => {
    switch (error.action) {
      case 'toast':
        toast.error(error.message)
        break
    }
  }
}
