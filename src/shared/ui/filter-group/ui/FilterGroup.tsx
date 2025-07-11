import React, { useState } from 'react';
import { CategoryFilter } from '@shared/ui/category-filter';
import { BOOK_FILTERS } from '@shared/constants';
import clsx from 'clsx';

export interface FilterValues {
  filter: string;
  printType: string;
  orderBy: string;
  langRestrict: string;
}

interface FilterGroupProps {
  values: FilterValues;
  onChange: (filters: FilterValues) => void;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  values,
  onChange,
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (
    filterType: keyof FilterValues,
    value: string
  ) => {
    onChange({
      ...values,
      [filterType]: value,
    });
  };

  // Открыто всегда на lg и выше, на меньших управляется open
  // (window.innerWidth >= 1024)
  const isAccordionOpen =
    typeof window !== 'undefined' ? window.innerWidth >= 1024 || open : open;

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md p-4 lg:p-6 flex flex-col',
        className
      )}>
      <button
        type='button'
        className='flex items-center justify-between !w-full lg:cursor-default cursor-pointer lg:pointer-events-none'
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls='filters-content'>
        <h2 className='text-lg font-bold text-gray-800 mb-2 lg:mb-0'>
          Фильтры
        </h2>
        {/* Иконка-стрелка, видна только на <lg */}
        <span
          className={`lg:hidden transition-transform duration-200 ${
            open ? 'rotate-90' : 'rotate-0'
          }`}
          aria-hidden='true'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M6 8L10 12L14 8'
              stroke='#333'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </button>
      {/* Контент фильтров: скрыт на <lg если закрыто, всегда виден на lg+ */}
      <div
        id='filters-content'
        className={`!flex pt-4 flex-col !gap-3 transition-all duration-200 overflow-hidden
          ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          lg:max-h-none lg:opacity-100 lg:block
        `}>
        <div>
          <span className='block text-sm font-semibold text-gray-700 !mb-2'>
            Тип
          </span>
          <CategoryFilter
            value={values.filter}
            onChange={value => handleFilterChange('filter', value)}
            options={BOOK_FILTERS.contentType}
          />
        </div>
        <div>
          <span className='block text-sm font-semibold text-gray-700 !mb-2'>
            Печать
          </span>
          <CategoryFilter
            value={values.printType}
            onChange={value => handleFilterChange('printType', value)}
            options={BOOK_FILTERS.printType}
          />
        </div>
        <div>
          <span className='block text-sm font-semibold text-gray-700 !mb-2'>
            Сортировка
          </span>
          <CategoryFilter
            value={values.orderBy}
            onChange={value => handleFilterChange('orderBy', value)}
            options={BOOK_FILTERS.orderBy}
          />
        </div>
        <div>
          <span className='block text-sm font-semibold text-gray-700 !mb-2'>
            Язык
          </span>
          <CategoryFilter
            value={values.langRestrict}
            onChange={value => handleFilterChange('langRestrict', value)}
            options={BOOK_FILTERS.language}
          />
        </div>
      </div>
    </div>
  );
};
