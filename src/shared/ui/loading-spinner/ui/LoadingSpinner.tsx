import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Загрузка книг...',
  className = '',
}) => {
  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
    </div>
  );
};
