export enum ErrorEnums {
  ERROR_400 = 'error_400',
  ERROR_401 = 'error_401',
  ERROR_403 = 'error_403',
  ERROR_404 = 'error_404',
  ERROR_500 = 'error_500',
  ERROR_503 = 'error_503'
}

export const errorMap: Record<keyof typeof ErrorEnums, string> = {
  ERROR_400: "Не удалось загрузить книги. Попробуйте позже",
  ERROR_401: 'Пользователь не авторизован',
  ERROR_403: "Не удалось загрузить книги. Попробуйте позже",
  ERROR_404: "Не удалось загрузить книги. Попробуйте позже",
  ERROR_500: 'Внутренняя ошибка сервера',
  ERROR_503: "Не удалось загрузить книги. Попробуйте позже"
}

