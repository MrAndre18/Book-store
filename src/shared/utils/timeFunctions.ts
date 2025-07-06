type PeriodType = 'day' | 'week' | 'week_2' | 'week_4';

/** Получаем массив дат в ISO-формате
 * @param period Тип периода (day, week, week_2, week_4)
 */
export const getDateRangeFromToday = (period: PeriodType): string[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let daysCount: number;
  switch (period) {
    case 'day': daysCount = 1; break;
    case 'week': daysCount = 7; break;
    case 'week_2': daysCount = 14; break;
    case 'week_4': daysCount = 28; break;
    default: throw new Error('Unknown period type');
  }
  return Array.from({ length: daysCount }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString();
  }).reverse();
}

/** Получаем массив дат прошлого периода (ISO-строки)
 * @param nowDates Массив дат в ISO-формате
 * @param period Тип периода (day, week, week_2, week_4)
 */
export const getDateRangePrevios = (nowDates: string[], period: PeriodType): string[] => {
  const shift = (() => {
    switch (period) {
      case 'day': return 1;
      case 'week': return 7;
      case 'week_2': return 14;
      case 'week_4': return 28;
      default: throw new Error('Unknown period type');
    }
  })();
  return nowDates.map(dateStr => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - shift);
    return date.toISOString();
  });
}