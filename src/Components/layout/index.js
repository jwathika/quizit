import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='flex justify-center mt-4'>
        <div className='container flex flex-col md:flex-row justify-center items-center bg-white p-8 shadow-lg rounded-lg'>
          <div className='hidden md:block w-1/4 p-8'>
            <img
              className='mx-auto mb-4 h-20'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow Logo'
              style={{ stroke: '#60a5fa' }}
            />
            <h1 className='text-center text-gray-800 text-lg font-bold mb-6'>
              Welcome to the Ultimate Trivia Quiz!
            </h1>
            <p className='text-center text-gray-600'>
              A quiz app which generates random questions based on different categories.
            </p>
          </div>
          <div className='w-3/4 p-8 border m-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
