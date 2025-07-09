import { setupStore } from '@app/store';
import { ConfigProvider } from 'antd';
import { FC } from 'react';
import { Provider } from 'react-redux';
import ruRU from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useErrorHandler } from '@features/error-handler';

interface TProps {
  children: React.ReactNode;
}

const store = setupStore();

const ErrorHandler: FC = () => {
  useErrorHandler();
  return null;
};

const Providers: FC<TProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }} locale={ruRU}>
        <ErrorHandler />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        {children}
      </ConfigProvider>
    </Provider>
  );
};

export { Providers };
