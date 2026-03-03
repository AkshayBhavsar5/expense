import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Chrome,
  Apple,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { AppTextField, AppButton, AppCard } from '../components/CustomMUI';
import { InputAdornment } from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Section: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white z-10">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="mb-10 text-center md:text-left">
            <div className="h-12 w-12 bg-[#4F46E5] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 mx-auto md:mx-0">
              <TrendingUp size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#1a1a2e] mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Financial management made simple.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 ml-1">
                Email Address
              </label>
              <AppTextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} className="text-slate-400" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-600">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-[#4F46E5] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <AppTextField
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} className="text-slate-400" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <AppButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="h-14 !shadow-xl !shadow-indigo-100"
            >
              Sign In
              <ArrowRight size={20} className="ml-2" />
            </AppButton>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                Or login with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AppButton
              variant="outlined"
              className="!bg-white !text-slate-700 !border-slate-200 !h-12 hover:!bg-slate-50"
            >
              <Chrome size={20} className="mr-2 text-red-500" />
              Google
            </AppButton>
            <AppButton
              variant="outlined"
              className="!bg-white !text-slate-700 !border-slate-200 !h-12 hover:!bg-slate-50"
            >
              <Apple size={20} className="mr-2 text-black" />
              Apple
            </AppButton>
          </div>

          <p className="text-center mt-10 text-sm text-slate-500 font-medium">
            New to the platform?{' '}
            <a href="#" className="text-[#4F46E5] font-bold hover:underline">
              Create a free account
            </a>
          </p>
        </div>
      </div>

      {/* Right Section: Marketing Content */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative items-center justify-center p-12 overflow-hidden border-l border-slate-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.05),transparent_50%)]"></div>

        <div className="relative z-10 w-full max-w-lg">
          <AppCard className="!p-0 !overflow-hidden border border-white/60 mb-12">
            <div className="relative aspect-[4/3]">
              <img
                src="/fintech_login_illustration_1772542317831.png"
                alt="Financial Analysis Illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/10 to-transparent"></div>
            </div>
          </AppCard>

          <div className="text-center px-4">
            <h2 className="text-3xl font-extrabold text-[#4F46E5] mb-4 leading-tight">
              Smart Insights for Your Financial Future
            </h2>
            <p className="text-slate-600 font-medium mb-12 text-lg">
              Manage your wealth with AI-driven analytics that help you save
              more every single day.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white">
                <ShieldCheck
                  size={24}
                  className="text-[#4F46E5] mx-auto mb-2"
                />
                <div className="text-xl font-extrabold text-slate-900">
                  $2.4M
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                  Savings
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white">
                <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
                <div className="text-xl font-extrabold text-slate-900">
                  99.9%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                  Accuracy
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white">
                <Star
                  size={24}
                  className="text-yellow-500 mx-auto mb-2 fill-current"
                />
                <div className="text-xl font-extrabold text-slate-900">
                  4.9/5
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
