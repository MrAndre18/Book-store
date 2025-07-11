import React from 'react';
import { BookHeader } from './BookHeader';
import { BookDescription } from './BookDescription';
import { BookDetails } from './BookDetails';
import { BookPricing } from './BookPricing';
import { BookAvailability } from './BookAvailability';

interface VolumeInfo {
  title?: string;
  authors?: string[];
  averageRating?: number;
  ratingsCount?: number;
  categories?: string[];
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
}

interface PriceInfo {
  amount?: number;
  currencyCode?: string;
}

interface SaleInfo {
  listPrice?: PriceInfo;
  retailPrice?: PriceInfo;
}

interface FormatInfo {
  isAvailable?: boolean;
}

interface AccessInfo {
  viewability?: string;
  epub?: FormatInfo;
  pdf?: FormatInfo;
}

interface BookContentProps {
  volumeInfo: VolumeInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
}

export const BookContent: React.FC<BookContentProps> = ({
  volumeInfo,
  saleInfo,
  accessInfo,
}) => {
  return (
    <section className='w-full flex flex-col gap-8'>
      <BookHeader
        title={volumeInfo.title}
        authors={volumeInfo.authors}
        averageRating={volumeInfo.averageRating}
        ratingsCount={volumeInfo.ratingsCount}
        categories={volumeInfo.categories}
      />
      <BookDescription description={volumeInfo.description} />
      <BookDetails
        publisher={volumeInfo.publisher}
        publishedDate={volumeInfo.publishedDate}
        pageCount={volumeInfo.pageCount}
        language={volumeInfo.language}
      />
      <BookPricing
        listPrice={saleInfo?.listPrice}
        retailPrice={saleInfo?.retailPrice}
      />
      <BookAvailability accessInfo={accessInfo} />
    </section>
  );
};
