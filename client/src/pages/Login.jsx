import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { API_BASE_URL } from '../config/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.message || 'Network error: Failed to connect to backend server');
    }
  };


  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.1),rgba(255,255,255,0))]"></div>
      
      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-300 mb-6 gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Website
        </Link>

        {/* Logo Header */}
        <div className="text-center mb-8">
          <img src={logoImg} alt="RudranPay Logo" className="h-14 w-14 mx-auto mb-3 object-contain rounded-xl" />
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to your RudranPay digital wallet portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajesh.kumar@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <a href="#" className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold">Forgot?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 mt-2"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-bold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
