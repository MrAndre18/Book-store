import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      {message && <p className='mt-2 text-gray-600'>{message}</p>}
    </div>
  );
};
