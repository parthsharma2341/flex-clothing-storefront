import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LoginPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { user, login } = useStore();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    setLocation('/account');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, name || email.split('@')[0]);
      setLocation('/account');
    }
  };

  const handleDemoLogin = () => {
    login('athlete.parth@flex-fit.shop', 'Parth Sharma');
    setLocation('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-white text-black font-display font-black text-2xl italic flex items-center justify-center mx-auto mb-3 shadow-xl">
          F
        </div>
        <h1 className="font-display font-black text-3xl uppercase text-white tracking-tight">
          {isRegister ? 'JOIN THE FLEX SYNDICATE' : 'ATHLETE SIGN IN'}
        </h1>
        <p className="text-xs text-neutral-400">
          Access your private orders, save shipping addresses, and manage early drop alerts.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-brand-surface p-1 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setIsRegister(false)}
          className={`py-2 rounded-lg transition-colors ${
            !isRegister ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsRegister(true)}
          className={`py-2 rounded-lg transition-colors ${
            isRegister ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-brand-surface p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
        {isRegister && (
          <div>
            <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Parth Sharma"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="athlete@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black hover:bg-brand-beige py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors mt-4 shadow-xl"
        >
          <span>{isRegister ? 'CREATE ATHLETE ACCOUNT' : 'ENTER DASHBOARD'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Demo Fast Track Login */}
        <div className="pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-brand-beige/10 hover:bg-brand-beige/20 text-brand-beige border border-brand-beige/30 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant 1-Click Demo Login</span>
          </button>
        </div>
      </form>

    </div>
  );
};
