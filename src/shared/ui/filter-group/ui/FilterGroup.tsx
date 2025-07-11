import React, { useState } from 'react';
import { CategoryFilter } from '@shared/ui/category-filter';
import { BOOK_FILTERS } from '@shared/constants';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export interface FilterValues {
  filter: string;
  orderBy: string;
  langRestrict: string;
}

interface FilterGroupProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
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

  const isAccordionOpen =
    typeof window !== 'undefined' ? window.innerWidth >= 1024 || open : open;

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md p-4 xl:p-6 flex flex-col',
        className
      )}>
      <button
        type='button'
        className='flex items-center justify-between !w-full xl:cursor-default cursor-pointer xl:pointer-events-none'
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls='filters-content'>
        <h2 className='text-lg font-bold text-gray-800'>Фильтры</h2>
        <span
          className={`xl:hidden transition-transform duration-200 ${
            open ? 'rotate-270' : 'rotate-90'
          }`}
          aria-hidden='true'>
          <ChevronRight width={20} height={20} />
        </span>
      </button>
      {isAccordionOpen && (
        <div
          id='filters-content'
          className={clsx('space-y-6 xl:space-y-8', open ? 'mt-4' : 'xl:mt-8')}>
          <CategoryFilter
            label='Тип книги'
            options={BOOK_FILTERS.contentType}
            value={values.filter}
            onChange={value => handleFilterChange('filter', value)}
          />
          <CategoryFilter
            label='Сортировка'
            options={BOOK_FILTERS.orderBy}
            value={values.orderBy}
            onChange={value => handleFilterChange('orderBy', value)}
          />
          <CategoryFilter
            label='Язык'
            options={BOOK_FILTERS.language}
            value={values.langRestrict}
            onChange={value => handleFilterChange('langRestrict', value)}
          />
        </div>
      )}
    </div>
  );
};
