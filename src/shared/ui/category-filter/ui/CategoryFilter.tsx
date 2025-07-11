import React from 'react';

interface FilterOption {
  readonly value: string;
  readonly label: string;
}

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly FilterOption[];
  label?: string;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
  options,
  label,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <span className='text-sm text-gray-600 mb-1'>{label}</span>}
      <select
        value={value}
        onChange={handleChange}
        className={
          'px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full transition-colors hover:border-gray-600'
        }>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
