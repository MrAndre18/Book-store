import { RouterProvider } from 'react-router/dom';
import { router } from './routes';
import '@shared/styles/index.scss';
import '@shared/styles/tailwind.config.css';
import { Providers } from './providers';

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
