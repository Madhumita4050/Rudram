import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  FileCheck,
  QrCode,
  Users,
  CreditCard,
  Layers,
  MessageSquare,
  Shield,
  Wallet,
  History as HistoryIcon
} from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAdmin = user && user.role === 'admin';
  const isUser = user && user.role !== 'admin';

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-900 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-6">
            <Link to={isAdmin ? "/admin" : isUser ? "/dashboard" : "/"} className="flex items-center gap-2 mr-2">
              <img src={logoImg} alt="RudranPay Logo" className="h-10 w-10 object-contain rounded-md" />
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-none">
                  RudranPay
                </span>
                {isAdmin && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                    Admin Panel
                  </span>
                )}
                {isUser && (
                  <span className="text-[10px] font-semibold text-slate-400 block">
                    User Portal
                  </span>
                )}
              </div>
            </Link>

            {/* Navigation Links - Role Specific */}
            <div className="hidden lg:flex space-x-1 items-center">
              {/* 1. ADMIN USER LINKS */}
              {isAdmin && (
                <>
                  <Link to="/admin" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname === '/admin' ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Dashboard
                  </Link>
                  <Link to="/admin/registrations" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/registrations') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Registrations
                  </Link>
                  <Link to="/admin/payment-settings" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/payment-settings') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Payment & QR Settings
                  </Link>
                  <Link to="/admin/users" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/users') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Users
                  </Link>
                  <Link to="/admin/requests" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/requests') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Service Requests
                  </Link>
                  <Link to="/admin/services" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/services') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Services Catalog
                  </Link>
                  <Link to="/admin/inquiries" className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${location.pathname.startsWith('/admin/inquiries') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Inquiries
                  </Link>
                </>
              )}

              {/* 2. REGULAR LOGGED-IN USER LINKS */}
              {isUser && (
                <>
                  <Link to="/dashboard" className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Dashboard
                  </Link>
                  <Link to="/services" className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/services') ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Services
                  </Link>
                  <Link to="/history" className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/history' ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Passbook / History
                  </Link>
                  <Link to="/register" className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/register' ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Apply / Registration
                  </Link>
                  <Link to="/contact" className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/contact' ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900'}`}>
                    Support & Help
                  </Link>
                </>
              )}

              {/* 3. PUBLIC GUEST LINKS (When not logged in) */}
              {!user && (
                <>
                  <Link to="/" className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors px-3 py-2">
                    Home
                  </Link>
                  <Link to="/services" className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors px-3 py-2">
                    Services
                  </Link>
                  <Link to="/about" className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors px-3 py-2">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors px-3 py-2">
                    Contact & Support
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side: User Profile / Auth Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {isUser && user.walletBalance !== undefined && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300 font-semibold">
                    <Wallet className="w-3.5 h-3.5 text-amber-400" />
                    <span>₹{user.walletBalance.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-100 rounded-full text-xs font-semibold hover:border-amber-400 transition-all"
                >
                  <UserIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span className="truncate max-w-[100px]">{user.name ? user.name.split(' ')[0] : (isAdmin ? 'Admin' : 'User')}</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-rose-500/20 rounded-full text-xs font-semibold transition-all"
                  title="Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2 border border-slate-700 text-slate-100 rounded-full text-xs font-bold hover:border-slate-300 hover:bg-slate-900 transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-full text-xs font-black shadow-md transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-900 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-4 space-y-3">
          {/* Admin Mobile Links */}
          {isAdmin && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 py-1">Admin Controls</div>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Dashboard
              </Link>
              <Link to="/admin/registrations" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Registrations
              </Link>
              <Link to="/admin/payment-settings" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Payment & QR Settings
              </Link>
              <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                User Management
              </Link>
              <Link to="/admin/requests" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Service Requests
              </Link>
              <Link to="/admin/services" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Services Catalog
              </Link>
              <Link to="/admin/inquiries" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Inquiries & Grievances
              </Link>
            </div>
          )}

          {/* User Mobile Links */}
          {isUser && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 py-1">User Portal</div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Dashboard
              </Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Services & Recharges
              </Link>
              <Link to="/history" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Passbook / History
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Apply / Registration
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                My Profile
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Support & Help
              </Link>
            </div>
          )}

          {/* Guest Mobile Links */}
          {!user && (
            <div className="space-y-1.5">
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Home
              </Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Services
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                About Us
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-200 hover:bg-slate-900 rounded-xl">
                Contact & Support
              </Link>
              <div className="pt-3 border-t border-slate-900 grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs font-bold border border-slate-700 text-slate-200 rounded-xl">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs font-black bg-amber-500 text-slate-950 rounded-xl">
                  Register
                </Link>
              </div>
            </div>
          )}

          {/* User Logout in Mobile */}
          {user && (
            <div className="pt-3 border-t border-slate-900">
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold rounded-xl"
              >
                <LogOut className="h-4 w-4" /> Logout ({user.name ? user.name.split(' ')[0] : 'Account'})
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
