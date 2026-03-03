import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard,
  Receipt,
  Analytics,
  AccountBalanceWallet,
  SwapHoriz,
  PhotoCamera,
  Person,
  Logout,
  TrendingUp,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks';
import { logout } from '../../store/slices/authSlice';

const navItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Transactions', icon: <SwapHoriz />, path: '/transactions' },
  { label: 'Budget', icon: <AccountBalanceWallet />, path: '/budget' },
  { label: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { label: 'Reports', icon: <Receipt />, path: '/reports' },
  { label: 'AI Scanner', icon: <PhotoCamera />, path: '/scanner' },
  { label: 'Profile', icon: <Person />, path: '/profile' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <aside className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }}
        >
          <TrendingUp sx={{ color: 'white', fontSize: 20 }} />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">
            ExpenseIQ
          </p>
          <p className="text-[10px] text-gray-400">Smart Finance</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
              style={
                active
                  ? { background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }
                  : {}
              }
            >
              <span
                className={`transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}
                style={{ fontSize: 20, display: 'flex' }}
              >
                {item.icon}
              </span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }}
          >
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email || 'user@email.com'}
            </p>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <Logout sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
