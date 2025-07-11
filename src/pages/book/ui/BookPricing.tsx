import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface PriceInfo {
  amount?: number;
  currencyCode?: string;
}

interface BookPricingProps {
  listPrice?: PriceInfo;
  retailPrice?: PriceInfo;
}

export const BookPricing: React.FC<BookPricingProps> = ({
  listPrice,
  retailPrice,
}) => {
  // Форматируем цену
  const formatPrice = (price?: PriceInfo) => {
    if (!price?.amount || !price?.currencyCode) return null;
    return `${price.amount} ${price.currencyCode}`;
  };

  if (!listPrice && !retailPrice) return null;

  return (
    <section className='w-full mb-2'>
      <h2 className='flex items-center gap-2 text-lg font-semibold text-neutral-800 !mb-2'>
        <ShoppingCart size={20} className='text-pink-400' />
        Цена
      </h2>
      <div className='flex flex-col gap-2'>
        {listPrice && (
          <div className='flex items-center gap-2 bg-neutral-100  rounded p-2'>
            <span className='text-xs text-neutral-500 '>
              Рекомендованная цена:
            </span>
            <span className='text-base text-neutral-800  font-medium'>
              {formatPrice(listPrice)}
            </span>
          </div>
        )}
        {retailPrice && (
          <div className='flex items-center gap-2 bg-neutral-100  rounded p-2'>
            <span className='text-xs text-neutral-500 '>Цена в магазине:</span>
            <span className='text-base text-neutral-800  font-medium'>
              {formatPrice(retailPrice)}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
