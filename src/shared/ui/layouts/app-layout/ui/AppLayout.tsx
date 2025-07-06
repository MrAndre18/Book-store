import { Outlet } from 'react-router';
import { Header } from './header';

const AppLayout = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-1'>
        <div className='container mx-auto px-4 py-6'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export { AppLayout };
