export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      medium?: string;
    };
  };
}

/** Расширенные типы для детальной информации о книге */
export interface IBookDetails {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    language?: string;
    maturityRating?: string;
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes?: ReadingModes;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    buyLink?: string;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
    };
    pdf?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
  };
  searchInfo?: {
    textSnippet?: string;
  };
}

export interface SearchInfo {
  textSnippet: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface Pdf {
  isAvailable: boolean;
  acsTokenLink: string;
}

export interface Epub {
  isAvailable: boolean;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface IBookCard {
  id: string;
  title: string | null;
  description: string | null;
  authors: string[] | null;
  image: string | null;
}

// Интерфейсы для фильтров перенесены в FilterGroup.tsx для лучшей организации