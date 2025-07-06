import { ErrorEnums } from "./errorMap"

export interface ErrorResponse {
  error: boolean
  message?: ErrorEnums
  code: ErrorEnums
}
