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
        {/* Иконка-стрелка, видна только на <lg */}
        <span
          className={`xl:hidden transition-transform duration-200 ${
            open ? 'rotate-270' : 'rotate-90'
          }`}
          aria-hidden='true'>
          <ChevronRight width={20} height={20} />
        </span>
      </button>
      {/* Контент фильтров: скрыт на <lg если закрыто, всегда виден на lg+ */}
      <div
        id='filters-content'
        className={`!flex flex-col !gap-3 transition-all duration-200 overflow-hidden
          ${open ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0'}
          xl:max-h-none xl:opacity-100 xl:block
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
