import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { services } from '../data/services';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
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

  const categories = [
    { name: 'Recharge & Bills', key: 'recharge-bills' },
    { name: 'Banking & Money', key: 'banking-money' },
    { name: 'Identity & Govt', key: 'identity-govt' },
    { name: 'Travel', key: 'travel' }
  ];

  const getServicesByCategory = (catName) => {
    return services.filter(s => s.category.toLowerCase().includes(catName.toLowerCase().split(' ')[0]));
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-900 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Left Side: Logo, Services Dropdown, About Us, Support */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mr-2">
              <img src={logoImg} alt="RudranPay Logo" className="h-10 w-10 object-contain rounded-md" />
              <span className="text-xl font-bold tracking-tight text-white">
                RudranPay
              </span>
            </Link>

            {/* Services Dropdown & General Links */}
            <div className="hidden lg:flex space-x-2 items-center">
              
              <Link to="/services" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                Services
              </Link>

              <Link to="/developers" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                Developers
              </Link>
              <Link to="/pricing" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                Pricing
              </Link>
              <Link to="/resources" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                Resources
              </Link>
              <Link to="/about" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                About
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-3 py-2">
                Support
              </Link>
            </div>
          </div>

          {/* Right Side: Download App, Notification Bell, User Profile / Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="#download" 
              onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }}
              className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors py-2 px-2"
            >
              Download App
            </a>

            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-full text-xs font-black shadow-lg shadow-amber-500/20 transition-all border border-amber-400 animate-pulse"
              >
                <span>⚙️ Admin Panel</span>
              </Link>
            )}

            {user && (
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors px-2 py-1"
              >
                Dashboard
              </Link>
            )}

            <button className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-900 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-full text-xs font-semibold hover:border-slate-300 hover:bg-slate-800 transition-all">
                  <UserIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span className="truncate max-w-[90px]">{user.name ? user.name.split(' ')[0] : 'User'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 border border-slate-700 text-slate-100 rounded-full text-sm font-semibold hover:border-slate-300 hover:bg-slate-900 transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 bg-amber-500 text-slate-900 rounded-full text-sm font-bold hover:bg-amber-400 transition-all shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button className="p-1.5 rounded-full text-slate-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Accordion Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-955 border-t border-slate-900 shadow-inner max-h-[85vh] overflow-y-auto">
          <div className="px-3 pt-2 pb-4 space-y-2 text-white">
            <div className="pt-2 border-t border-slate-900 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Link to="/services" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md">
                  Services
                </Link>
                <Link to="/developers" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md">
                  Developers
                </Link>
                <Link to="/pricing" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md">
                  Pricing
                </Link>
                <Link to="/resources" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md">
                  Resources
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md">
                  About
                </Link>
              </div>
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }}
                className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md"
              >
                Download App
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 rounded-md"
              >
                Contact Support
              </Link>

              {user ? (
                <div className="pt-2 border-t border-slate-800 mt-2 space-y-2">
                  <div className="text-center text-sm font-bold text-amber-500 mb-1">
                    Welcome, {user.name ? user.name.split(' ')[0] : 'User'}!
                  </div>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center items-center gap-2 w-full py-2 text-sm font-bold bg-amber-500 text-slate-950 rounded-md hover:bg-amber-400"
                    >
                      ⚙️ Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 w-full py-2 text-sm font-semibold bg-slate-900 border border-slate-700 text-slate-100 rounded-md hover:bg-slate-800"
                  >
                    User Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 w-full py-2 text-sm font-medium border border-slate-700 text-slate-100 rounded-md hover:bg-slate-900"
                  >
                    <UserIcon className="h-4 w-4 text-amber-400" /> My Profile
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="flex justify-center items-center gap-2 w-full py-2 text-sm font-bold bg-slate-800 text-red-400 rounded-md hover:bg-slate-700"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-2 text-sm font-medium border border-slate-700 text-slate-300 rounded-md hover:bg-slate-900 mt-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-2 text-sm font-bold bg-amber-500 text-slate-900 rounded-md hover:bg-amber-400 mt-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
