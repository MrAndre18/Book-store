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
      className={`bg-red-500 text-white text-sm rounded px-4 py-2 ${className}`}
      data-testid='error-message'>
      {message}
    </div>
  );
};
