import React from 'react';
import { CSS_CLASSES } from '@shared/constants';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
}) => {
  return (
    <div
      className={`${CSS_CLASSES.errorMessage} ${className}`}
      data-testid='error-message'>
      Ошибка: {message}
    </div>
  );
};
