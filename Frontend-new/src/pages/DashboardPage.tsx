import { FC } from 'react';
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from '../utils/Date';

interface User {
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
}

const DashboardPage: FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = (): void => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-md p-8 mx-auto mt-10 bg-gray-900 border border-gray-800 shadow-2xl bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl'
    >
      <h2 className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-sky-600 bg-clip-text'>
        Dashboard
      </h2>

      <div className='space-y-6'>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className='mb-3 text-xl font-semibold text-blue-400'>Profile Information</h3>
          {user && (
            <>
              <p className='text-gray-300'>Name: {user.name}</p>
              <p className='text-gray-300'>Email: {user.email}</p>
            </>
          )}
        </motion.div>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className='mb-3 text-xl font-semibold text-blue-400'>Account Activity</h3>
          <p className='text-gray-300'>
            <span className='font-bold'>Joined: </span>
            {user && new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className='text-gray-300'>
            <span className='font-bold'>Last Login: </span>
            {user ? formatDate(user.lastLogin) : 'N/A'}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='w-full px-4 py-3 font-bold text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;