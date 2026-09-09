import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Wallet,
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  QrCode
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import logoFullImg from '../assets/logo_full.png';
import qrAsset from '../assets/payment-qr.png';

// ---------------------------------------------------------
// APP DOWNLOAD LINKS (Replace with your actual links anytime)
// ---------------------------------------------------------
export const APP_DOWNLOAD_LINKS = {
  androidApkUrl: '', // e.g., '/downloads/rudranpay.apk' or direct URL
  playStoreUrl: '',  // e.g., 'https://play.google.com/store/apps/details?id=com.rudranpay'
  appStoreUrl: '',   // e.g., 'https://apps.apple.com/app/rudranpay/id123456'
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
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

  // Listen for global open-download-modal event & ESC key to close
  useEffect(() => {
    const handleOpenModal = () => setDownloadModalOpen(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDownloadModalOpen(false);
      }
    };

    window.addEventListener('open-download-modal', handleOpenModal);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-download-modal', handleOpenModal);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleDownloadClick = (type, url) => {
    if (url && url.trim() !== '' && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert("📥 RudranPay Mobile Application downloading started (APK format for testing)...");
    }
  };

  const isAdmin = user && user.role === 'admin';
  const isUser = user && user.role !== 'admin';

  return (
    <nav className="sticky top-0 z-50 bg-[#e3efff]/95 backdrop-blur-md border-b border-[#cde2fd] py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 mr-6 group shrink-0">
              <img src={logoFullImg} alt="RudranPay Logo" className="h-9 md:h-10 object-contain group-hover:scale-102 transition-transform" />
              {isAdmin && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/90 px-2 py-0.5 rounded-md whitespace-nowrap">
                  Admin
                </span>
              )}
              {isUser && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-200/90 px-2 py-0.5 rounded-md whitespace-nowrap">
                  User
                </span>
              )}
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex space-x-1 items-center">
              {isUser ? (
                /* USER PORTAL SPECIFIC LINKS ONLY */
                <>
                  <Link to="/dashboard" className={`text-sm font-bold px-3.5 py-2 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Dashboard
                  </Link>
                  <Link to="/history" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/history') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Passbook
                  </Link>
                  <Link to="/offers" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/offers') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Offers
                  </Link>
                  <Link to="/contact" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/contact') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Support
                  </Link>
                </>
              ) : (
                /* GUEST & ADMIN PUBLIC NAVIGATION */
                <>
                  <Link to="/services" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/services') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Services
                  </Link>
                  <Link to="/developers" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/developers') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Developers
                  </Link>
                  <Link to="/pricing" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/pricing') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Pricing
                  </Link>
                  <Link to="/resources" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/resources') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Resources
                  </Link>
                  <Link to="/about" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/about') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    About
                  </Link>
                  <Link to="/contact" className={`text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${location.pathname.startsWith('/contact') ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-800 hover:text-slate-950 hover:bg-sky-200/50'}`}>
                    Support
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Actions (Download App, Admin Panel Button, Profile/Auth Buttons) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Download App Button */}
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="text-sm font-semibold text-slate-800 hover:text-slate-950 px-3 py-2 rounded-xl hover:bg-sky-200/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Download App</span>
            </button>

            {/* Admin Panel Quick Jump Button (for Admin on live site) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* Auth / Profile Area */}
            {user ? (
              <div className="flex items-center space-x-2.5">
                {isUser && user.walletBalance !== undefined && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sky-200 rounded-xl text-xs text-slate-900 font-bold shadow-xs">
                    <Wallet className="w-3.5 h-3.5 text-amber-600" />
                    <span>₹{user.walletBalance.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <Link 
                  to={isAdmin ? "/admin" : "/profile"} 
                  className="flex items-center gap-2 px-3.5 py-2 bg-white border border-sky-200 text-slate-900 rounded-xl text-xs font-semibold hover:border-sky-300 hover:bg-sky-50 transition-all shadow-xs"
                >
                  <UserIcon className="h-3.5 w-3.5 text-amber-600" />
                  <span className="truncate max-w-[100px]">{user.name ? user.name.split(' ')[0] : (isAdmin ? 'Admin' : 'User')}</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-xl text-xs font-semibold transition-all"
                  title="Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link 
                  to="/login" 
                  className="px-4 py-2 border border-sky-300 hover:border-slate-900 text-slate-800 hover:text-slate-950 hover:bg-white/80 rounded-full text-xs font-bold transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full text-xs font-black shadow-sm transition-all"
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
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-sky-200/50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#e3efff] border-t border-[#cde2fd] shadow-xl max-h-[85vh] overflow-y-auto px-4 py-4 space-y-3">
          {/* Download App in Mobile Menu */}
          <button
            type="button"
            onClick={() => { setIsOpen(false); setDownloadModalOpen(true); }}
            className="w-full text-left py-2.5 px-3.5 bg-amber-500/10 border border-amber-300/60 rounded-2xl flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Smartphone className="w-4 h-4 text-amber-600" />
              Download Mobile App
            </span>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
              APK / iOS
            </span>
          </button>

          {/* Admin Mobile Links */}
          {isAdmin && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider px-2 py-1">Admin Controls</div>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Dashboard
              </Link>
              <Link to="/admin/registrations" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Registrations
              </Link>
              <Link to="/admin/payment-settings" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Payment & QR Settings
              </Link>
              <Link to="/admin/users" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                User Management
              </Link>
              <Link to="/admin/requests" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Service Requests
              </Link>
              <Link to="/admin/services" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Services Catalog
              </Link>
              <Link to="/admin/inquiries" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Inquiries & Support
              </Link>
            </div>
          )}

          {/* User Portal Mobile Links */}
          {isUser && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider px-2 py-1">User Portal</div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Dashboard
              </Link>
              <Link to="/history" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Passbook / History
              </Link>
              <Link to="/offers" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Special Offers
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Help & Support
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                My Profile
              </Link>
            </div>
          )}

          {/* Guest Public Links */}
          {!user && (
            <div className="space-y-1.5">
              <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Services
              </Link>
              <Link to="/developers" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Developers
              </Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Pricing
              </Link>
              <Link to="/resources" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Resources
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                About
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl">
                Support
              </Link>
            </div>
          )}

          {/* Guest Mobile Links */}
          {!user && (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs font-bold border border-slate-300 text-slate-800 rounded-full hover:bg-slate-100">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs font-black bg-amber-500 text-slate-950 rounded-full">
                Register
              </Link>
            </div>
          )}

          {/* User Logout in Mobile */}
          {user && (
            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Logout ({user.name ? user.name.split(' ')[0] : 'Account'})
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DOWNLOAD APP POPUP MODAL (Rendered via Portal to document.body) */}
      {/* ------------------------------------------------------------- */}
      {downloadModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setDownloadModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl relative text-slate-900 my-auto max-h-[90vh] overflow-y-auto flex flex-col space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="RudranPay App" className="w-10 h-10 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100" />
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                    Download RudranPay App
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Available on Android & iOS
                  </p>
                </div>
              </div>

              {/* Close 'X' Button at Top Right */}
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                title="Close (बंद करें)"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant DMT & AEPS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero Failure UPI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Passbook & Receipts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>24/7 Assisted Support</span>
              </div>
            </div>

            {/* Download Buttons Section */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Choose Platform to Download
              </p>

              {/* 1. Android APK Direct Download */}
              <button
                type="button"
                onClick={() => handleDownloadClick('Android APK', APP_DOWNLOAD_LINKS.androidApkUrl)}
                className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all shadow-md shadow-amber-500/20 group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-slate-950 text-white rounded-xl flex-shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-tight">Download Android APK (Direct)</p>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-800">Latest Stable Release • Android 8.0+</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>

              {/* 2. Google Play Store */}
              <button
                type="button"
                onClick={() => handleDownloadClick('Google Play Store', APP_DOWNLOAD_LINKS.playStoreUrl)}
                className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-bold transition-all shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-slate-800 text-amber-400 rounded-xl flex-shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-tight">Get it on Google Play Store</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-400">Verified by Google Play Protect</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>

              {/* 3. Apple App Store */}
              <button
                type="button"
                onClick={() => handleDownloadClick('Apple App Store', APP_DOWNLOAD_LINKS.appStoreUrl)}
                className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-all border border-slate-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-white text-slate-800 rounded-xl border border-slate-200 shadow-xs flex-shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-tight">Download on the App Store</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500">For iPhone & iPad (iOS)</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>
            </div>

            {/* Explicit Close Button & Security Footer */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" /> Close Window (बंद करें)
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Virus-Free & 256-Bit SSL Encrypted
                </span>
                <span className="font-bold text-slate-600">v2.4.0</span>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
