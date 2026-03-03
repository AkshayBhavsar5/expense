import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { NotificationsNone, Search } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/useAppHooks';

const Layout: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'User'} 👋
            </h1>
            <p className="text-xs text-gray-400">
              Track and manage your finances
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 w-64">
              <Search sx={{ color: '#9ca3af', fontSize: 18 }} />
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400 w-full"
              />
            </div>
            {/* Notifications */}
            <button className="relative w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <NotificationsNone sx={{ color: '#6b7280', fontSize: 20 }} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1325ec, #6b7aff)',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
