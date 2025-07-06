import { setupStore } from '@app/store';
import { ConfigProvider } from 'antd';
import { FC } from 'react';
import { Provider } from 'react-redux';
import ruRU from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';

interface TProps {
  children: React.ReactNode;
}

const store = setupStore();

const Providers: FC<TProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }} locale={ruRU}>
        {children}
      </ConfigProvider>
    </Provider>
  );
};

export { Providers };
