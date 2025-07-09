import React from 'react';
import { CSS_CLASSES, MESSAGES } from '@shared/constants';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = MESSAGES.ui.loadingBooks,
  className = '',
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className={CSS_CLASSES.loadingSpinner}></div>
      <p className='mt-2 text-gray-600'>{message}</p>
    </div>
  );
};
