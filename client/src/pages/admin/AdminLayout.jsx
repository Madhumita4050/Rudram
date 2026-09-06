import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  CreditCard,
  Layers,
  MessageSquare,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { API_BASE_URL } from '../../config/api';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      setIsAuthorized(false);
      setCheckingAuth(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      setCurrentUser(parsedUser);
      if (parsedUser.role === 'admin') {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      setIsAuthorized(false);
    } finally {
      setCheckingAuth(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthorized(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Registrations', path: '/admin/registrations', icon: FileCheck },
    { label: 'Users & Roles', path: '/admin/users', icon: Users },
    { label: 'Service Requests', path: '/admin/requests', icon: CreditCard },
    { label: 'Services Catalog', path: '/admin/services', icon: Layers },
    { label: 'Inquiries & Support', path: '/admin/inquiries', icon: MessageSquare },
  ];

  // Direct Admin Login Handler
  const [adminEmail, setAdminEmail] = useState('admin@rudram.com');
  const [adminPassword, setAdminPassword] = useState('Admin@12345');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleAdminDirectLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      setLoginError(null);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      if (data.user.role !== 'admin') {
        throw new Error('This account does not have Admin privileges.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      setIsAuthorized(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };


  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20 shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Admin Portal Access</h2>
            <p className="text-xs text-slate-400 mt-1">Enter Administrator credentials to unlock control panel</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminDirectLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Admin Email ID
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@rudram.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 mt-2"
            >
              {loginLoading ? 'Authenticating...' : 'Unlock Admin Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="RudranPay" className="h-8 w-8 object-contain rounded-lg" />
          <span className="font-bold text-white text-lg">Rudran Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  RudranPay <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">ADMIN</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">Control & Management Hub</p>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5 flex-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Main Navigation</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </div>

          {/* Bottom Actions & User Info */}
          <div className="pt-4 mt-auto border-t border-slate-800 space-y-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-amber-400" /> View Public Site
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Live</span>
            </Link>

            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30 flex-shrink-0">
                  {currentUser?.name?.charAt(0) || 'A'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Admin Portal</span>
              <span>/</span>
              <span className="text-amber-400 font-bold capitalize">
                {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Live & Synced</span>
            </div>

            <Link
              to="/admin/registrations"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Registrations</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        ></div>
      )}
    </div>
  );
}
