import { STATUS_COLORS } from '@shared/theme/constants';
import { TimelineBar } from '@shared/ui';
import { DataType } from '../model/types';

export const timelineData = [
    { slug: 'work', name: 'Работает', color: '#10B981', ratio: 0.45 },
    { slug: 'idle', name: 'Простой', color: '#FBBF24', ratio: 0.2 },
    { slug: 'service', name: 'Обслуживание', color: '#3B82F6', ratio: 0.1 },
    { slug: 'error', name: 'Авария', color: '#EF4444', ratio: 0.05 },
    { slug: 'work-again', name: 'Работает', color: '#10B981', ratio: 0.2 },
];

export const machineLoadData = [
    { name: 'Работает', value: 45, color: STATUS_COLORS.green },
    { name: 'Простой', value: 20, color: STATUS_COLORS.yellow },
    { name: 'Обслуживание', value: 15, color: STATUS_COLORS.blue },
    { name: 'Авария', value: 20, color: STATUS_COLORS.red },
];

export const statusList = [
    STATUS_COLORS.green,
    STATUS_COLORS.yellow,
    STATUS_COLORS.blue,
    STATUS_COLORS.red,
    STATUS_COLORS.gray,
];


// Данные для таблицы
export const data: DataType[] = Array.from({ length: 8 }, (_, i) => ({
    key: i.toString(),
    name: 'DOOSAN 2600LY',
    serial: 'NS:152667dl',
    program: 'xLk_051',
    timeline: <TimelineBar data={timelineData} timeStep={4} />,
    load: '45%',
    amount: '124230',
    statusColor: statusList[i % statusList.length],
}));