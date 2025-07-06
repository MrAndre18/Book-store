export interface IFilters {
  date: string;
  time: [string, string];
  shift: TshiftKeys;
  machine: string;
}

export const SHIFT = {
  all: 'Все смены',
  first: 'Смена 1',
  second: 'Смена 2',
} as const
export type TshiftKeys = keyof typeof SHIFT;

export interface DataType {
  key: string;
  name: string;
  serial: string;
  program: string;
  timeline: React.ReactNode;
  load: string;
  amount: string;
  statusColor: string;
}