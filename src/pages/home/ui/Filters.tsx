import { Select, DatePicker, TimePicker, toOptions } from '@shared/ui';
import dayjs from 'dayjs';
import { IFilters, TshiftKeys, SHIFT } from '../model/types';

interface FiltersProps {
    filters: IFilters;
    handleChange: (key: keyof IFilters, value: any) => void;
    handleDateChange: (date: dayjs.Dayjs | null) => void;
    handleTimeChange: (timeStrings: [string, string]) => void;
}

const shiftOptions = toOptions<typeof SHIFT, TshiftKeys>(SHIFT);

export const Filters = ({
    filters,
    handleChange,
    handleDateChange,
    handleTimeChange,
}: FiltersProps) => {
    return (
        <div className="flex gap-4 flex-wrap items-center">

            <Select
                options={[
                    { value: 'all', label: 'Все станки' },
                    { value: '1', label: 'Станок 1' },
                    { value: '2', label: 'Станок 2' },
                    { value: '3', label: 'Станок 3' },
                    { value: '4', label: 'Станок 4' },
                ]}
                onChange={(val) => handleChange('machine', val)}
                label="Оборудование"
                className="max-w-[200px] w-full"
                value={filters.machine}
            />

            <Select
                options={shiftOptions}
                value={filters.shift}
                label="Смена"
                onChange={(val) => handleChange('shift', val)}
                className="max-w-[200px] w-full"
            />

            <DatePicker
                label="Дата"
                placeholder="Выберите дату"
                allowClear
                value={filters.date ? dayjs(filters.date) : null}
                onChange={handleDateChange}
                className="max-w-[200px] w-full"
            />

            <TimePicker.RangePicker
                label="Время"
                placeholder={['Выберите время', 'Выберите время']}
                allowClear
                onChange={(times, timeStrings) => handleTimeChange(timeStrings as [string, string])}
                className="max-w-[200px] w-full"
                value={filters.time.map(t => dayjs(t, 'HH:mm')) as [dayjs.Dayjs, dayjs.Dayjs]}
            />

        </div>
    );
};
