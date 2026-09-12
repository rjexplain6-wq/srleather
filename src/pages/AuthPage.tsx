import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import { ArrowLeft, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'register';
  setCurrentPage: (page: PageView) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, setCurrentPage }) => {
  const { loginWithEmail, registerWithEmail, loginWithGoogle, showToast } = useStore();

  const [isRegister, setIsRegister] = useState<boolean>(mode === 'register');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name');
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password, name);
        showToast('Account created successfully!', 'success');
      } else {
        await loginWithEmail(email, password);
        showToast('Welcome back!', 'success');
      }
      setCurrentPage('account');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters.');
      } else {
        setErrorMsg(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      showToast('Signed in with Google!', 'success');
      setCurrentPage('account');
    } catch (err: any) {
      console.error('Google auth error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err.message || 'Google sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16 space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage('home')}
          aria-label="Back to home"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-[#6B7280]">
            {isRegister
              ? 'Join SR Leather for order tracking & exclusive perks'
              : 'Sign in to access your orders and saved wishlist'}
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        {/* Google One-Click Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl border border-[#ECE8E1] hover:bg-[#F7F5F0] text-xs sm:text-sm font-semibold text-[#1C2A20] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#ECE7DF]" />
          <span className="text-[11px] uppercase tracking-wider text-[#9CA3AF]">
            Or continue with email
          </span>
          <div className="flex-1 h-px bg-[#ECE7DF]" />
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-[#4A5568] mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hasan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#4A5568] mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A5568] mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all pt-3"
          >
            <span>{loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#6B7280]">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setErrorMsg('');
                }}
                className="font-semibold text-[#1C2A20] underline hover:text-[#8B5E34]"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setErrorMsg('');
                }}
                className="font-semibold text-[#1C2A20] underline hover:text-[#8B5E34]"
              >
                Create One
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
