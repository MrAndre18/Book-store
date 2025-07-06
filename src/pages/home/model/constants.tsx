import { DataType } from '../model/types';

export const columns = [
  {
    title: '',
    dataIndex: 'checkbox',
    key: 'checkbox',
    render: () => <input type='checkbox' />,
    width: 40,
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: DataType) => (
      <div className="flex items-center gap-2">
        <span
          style={{ backgroundColor: record.statusColor }}
          className='inline-block w-2.5 h-2.5 rounded-full'></span>
        <span>{record.name}</span>
      </div>
    ),
  },
  { title: 'Программа', dataIndex: 'program', key: 'program' },
  { title: 'График загрузки', dataIndex: 'timeline', key: 'timeline' },
  {
    title: <div className='text-center'>Загрузка</div>,
    dataIndex: 'load',
    key: 'load',
    className: 'text-center',
  },
  { title: 'Кол-во', dataIndex: 'amount', key: 'amount' },
];
