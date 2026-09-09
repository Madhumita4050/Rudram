import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, Loader2, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { API_BASE_URL } from '../config/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      setSuccess(true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        if (data.user && data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 400);
    } catch (err) {
      setError(err.message || 'Network error: Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),rgba(255,255,255,0))]"></div>

      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 text-white animate-in fade-in zoom-in-95 duration-200">

        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6 gap-1 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Website
        </Link>

        {/* Logo Header */}
        <div className="text-center mb-6">
          <img src={logoImg} alt="RudranPay Logo" className="h-14 w-14 mx-auto mb-3 object-contain rounded-2xl shadow-sm" />
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to your RudranPay Portal</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-400 text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {success && (
          <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-emerald-400 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Login successful! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rudran.com or user@example.com"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold transition-colors">Forgot?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-3 cursor-pointer select-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 text-slate-950" />
                <span>Sign In</span>
              </>
            )}
          </button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
