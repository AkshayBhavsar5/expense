import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppHooks';
import { logout } from '../store/slices/authSlice';
import { toggleDarkMode } from '../store/slices/uiSlice';
import {
  Person,
  Notifications,
  Security,
  Palette,
  Edit,
  Logout,
  CheckCircle,
} from '@mui/icons-material';
import { Switch } from '@mui/material';
import { AppCard, AppButton } from '../components/CustomMUI';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s: any) => s.auth.user);
  const darkMode = useAppSelector((s: any) => s.ui.darkMode);
  const expenses = useAppSelector((s: any) => s.expenses.items);

  const [notifications, setNotifications] = useState({
    budget: true,
    weekly: true,
    tips: false,
  });
  const [currency, setCurrency] = useState('USD');

  const totalIncome = expenses
    .filter((e: any) => e.type === 'income')
    .reduce((a: number, b: any) => a + b.amount, 0);
  const totalExpense = expenses
    .filter((e: any) => e.type === 'expense')
    .reduce((a: number, b: any) => a + b.amount, 0);

  const Section: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <AppCard className="!p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#4F46E5]">{icon}</span>
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      </div>
      {children}
    </AppCard>
  );

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Profile & Settings
        </h2>
        <p className="text-slate-500 font-medium">
          Manage your account security and application preferences
        </p>
      </div>

      {/* Profile Card */}
      <AppCard
        className="!p-0 !overflow-hidden !border-none"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
        }}
      >
        <div className="p-8 flex items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-[28px] flex items-center justify-center text-4xl font-extrabold text-white bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl shadow-indigo-900/20">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Edit sx={{ fontSize: 18, color: '#4F46E5' }} />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {user?.name || 'Akshay Bhavsar'}
              </h3>
              <CheckCircle
                sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)' }}
              />
            </div>
            <p className="text-white/80 font-medium text-lg">
              {user?.email || 'akshay@expenseiq.com'}
            </p>
          </div>
          {/* Stats */}
          <div className="flex gap-4">
            {[
              { label: 'Transactions', value: expenses.length },
              {
                label: 'Income',
                value: `$${((totalIncome || 0) / 1000).toFixed(1)}k`,
              },
              {
                label: 'Saved',
                value: `$${(((totalIncome || 0) - (totalExpense || 0)) / 1000).toFixed(1)}k`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 min-w-[100px] border border-white/10"
              >
                <p className="text-white font-extrabold text-xl">{s.value}</p>
                <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AppCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Personal Info */}
        <Section
          title="Personal Information"
          icon={<Person sx={{ fontSize: 24 }} />}
        >
          <div className="space-y-4">
            {[
              { label: 'Full Name', value: user?.name || 'Akshay Bhavsar' },
              { label: 'Email', value: user?.email || 'akshay@expenseiq.com' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Location', value: 'Mumbai, India' },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all group"
              >
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    {f.label}
                  </p>
                  <p className="text-sm font-bold text-slate-800">{f.value}</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border-none cursor-pointer">
                  <Edit sx={{ fontSize: 16, color: '#4F46E5' }} />
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* Notifications */}
        <Section
          title="Notifications"
          icon={<Notifications sx={{ fontSize: 24 }} />}
        >
          <div className="space-y-5">
            {[
              {
                key: 'budget',
                label: 'Budget Alerts',
                desc: 'Get notified when nearing budget limit',
              },
              {
                key: 'weekly',
                label: 'Weekly Summary',
                desc: 'Receive weekly expense reports',
              },
              {
                key: 'tips',
                label: 'Money-saving Tips',
                desc: 'AI-powered saving suggestions',
              },
            ].map((n) => (
              <div
                key={n.key}
                className="flex items-center justify-between p-2"
              >
                <div>
                  <p className="text-sm font-bold text-slate-800">{n.label}</p>
                  <p className="text-xs text-slate-400 font-medium">{n.desc}</p>
                </div>
                <Switch
                  checked={notifications[n.key as keyof typeof notifications]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [n.key]: !prev[n.key as keyof typeof notifications],
                    }))
                  }
                  color="primary"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance" icon={<Palette sx={{ fontSize: 24 }} />}>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-bold text-slate-800">Dark Mode</p>
                <p className="text-xs text-slate-400 font-medium">
                  Switch to dark interface
                </p>
              </div>
              <Switch
                checked={darkMode}
                onChange={() => dispatch(toggleDarkMode())}
                color="primary"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 mb-3 ml-2">
                Theme Color
              </p>
              <div className="flex gap-4 ml-2">
                {['#4F46E5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(
                  (c) => (
                    <button
                      key={c}
                      className="w-10 h-10 rounded-2xl border-none cursor-pointer transition-all hover:scale-110 shadow-sm"
                      style={{
                        background: c,
                        boxShadow:
                          c === '#4F46E5'
                            ? '0 0 0 4px rgba(79, 70, 229, 0.2)'
                            : 'none',
                      }}
                    />
                  ),
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 mb-3 ml-2">
                Currency
              </p>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-[#4F46E5] text-slate-700"
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>INR (₹)</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" icon={<Security sx={{ fontSize: 24 }} />}>
          <div className="space-y-4">
            {[
              {
                label: 'Change Password',
                desc: 'Update your account password',
              },
              {
                label: 'Two-Factor Authentication',
                desc: 'Add an extra layer of security',
              },
              { label: 'Login History', desc: 'View recent sign-in activity' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all text-left border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.desc}
                  </p>
                </div>
                <span className="text-slate-300 text-xl font-bold">›</span>
              </button>
            ))}
            <AppButton
              fullWidth
              variant="outlined"
              onClick={() => dispatch(logout())}
              className="!bg-red-50 !text-red-600 !border-red-100 hover:!bg-red-100 !mt-4 !h-12"
              startIcon={<Logout />}
            >
              Sign Out from Device
            </AppButton>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Profile;
