import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickPayWidget from '../components/QuickPayWidget';
import TrustBadges from '../components/TrustBadges';
import DynamicIcon from '../components/DynamicIcon';
import { getServices } from '../api/services';
import { getOffers } from '../api/offers';
import { ArrowRight, Smartphone, Check, Sparkles, Award, Shield, Wifi, Battery, Heart } from 'lucide-react';
import businessHeroImg from '../assets/premium_business_hero.png';
import upiAvatarsImg from '../assets/upi_avatars.png';

export default function Home() {
  const [servicesList, setServicesList] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getServices(), getOffers()]).then(([serviceData, offerData]) => {
      setServicesList(serviceData);
      setOffersList(offerData);
      setLoading(false);
    });
  }, []);

  // Split services by category for structured sections
  const rechargeBills = servicesList.filter(s => s.category === 'Recharge & Bills');
  const bankingMoney = servicesList.filter(s => s.category === 'Banking & Money');
  const identityGovt = servicesList.filter(s => s.category === 'Identity & Govt');

  const getIconGradient = (id) => {
    switch (id) {
      case 'mobile-dth-recharge': return 'bg-gradient-to-br from-amber-450 to-emerald-500 text-white shadow-md shadow-amber-550/20';
      case 'fastag-recharge': return 'bg-gradient-to-br from-blue-450 to-indigo-500 text-white shadow-md shadow-blue-550/20';
      case 'utility-bills': return 'bg-gradient-to-br from-amber-450 to-orange-500 text-white shadow-md shadow-amber-550/20';
      case 'insurance-premium': return 'bg-gradient-to-br from-rose-450 to-pink-500 text-white shadow-md shadow-rose-550/20';
      case 'loan-emi': return 'bg-gradient-to-br from-violet-450 to-purple-500 text-white shadow-md shadow-violet-550/20';
      case 'money-transfer-dmt': return 'bg-gradient-to-br from-sky-450 to-blue-500 text-white shadow-md shadow-sky-550/20';
      case 'aeps-aadhaar-banking': return 'bg-gradient-to-br from-emerald-450 to-amber-500 text-white shadow-md shadow-emerald-555/20';
      case 'micro-atm-kiosk': return 'bg-gradient-to-br from-purple-450 to-fuchsia-500 text-white shadow-md shadow-purple-550/20';
      case 'digital-gold': return 'bg-gradient-to-br from-yellow-400 to-amber-550 text-slate-900 shadow-md shadow-yellow-550/20';
      case 'pan-card-apply': return 'bg-gradient-to-br from-orange-450 to-red-500 text-white shadow-md shadow-orange-550/20';
      case 'csc-certificates': return 'bg-gradient-to-br from-cyan-450 to-blue-500 text-white shadow-md shadow-cyan-550/20';
      case 'travel-booking': return 'bg-gradient-to-br from-lime-450 to-green-500 text-white shadow-md shadow-lime-550/20';
      default: return 'bg-gradient-to-br from-amber-450 to-emerald-500 text-white shadow-md';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* Premium Hero Section */}
      <header className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Abstract Glow Rings */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" /> India's Most Trusted Digital Agency Portal
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Fintech Payments <br />
                <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  Made Effortless & Safe
                </span>
              </h1>
              
              <p className="text-slate-350 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                Process superfast mobile top-ups, instant FASTag clearances, domestic bank transfers, or secure government CSC certificates from one premium workspace.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/services"
                  className="bg-amber-500 hover:bg-amber-605 text-slate-950 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/10 text-sm flex items-center gap-1.5"
                >
                  Explore 12 Services <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-download-modal'))}
                  className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3.5 rounded-full transition-colors text-sm font-semibold cursor-pointer"
                >
                  Download App
                </button>
              </div>
            </div>

            {/* Right Column: Premium CSS 3D Mobile Mockup & Form */}
            <div className="lg:col-span-6 flex flex-col md:flex-row items-center justify-center gap-8">
              
              {/* Ultra-Premium CSS Smartphone Mockup with 3D Float Animation */}
              <div className="hidden sm:block relative w-64 h-[440px] bg-slate-950 rounded-[44px] border-[6px] border-slate-800 shadow-2xl p-3 flex flex-col justify-between transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-[float_6s_ease-in-out_infinite]">
                
                {/* Speaker & Sensor Notch */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-4.5 bg-slate-900 rounded-full flex items-center justify-between px-3">
                  <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                  <div className="w-10 h-1 bg-slate-855 rounded-full"></div>
                </div>

                {/* Inner Screen Content */}
                <div className="flex-grow bg-slate-900 rounded-[32px] p-4 flex flex-col justify-between border border-slate-850 overflow-hidden relative">
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold mb-4 pt-1">
                    <span>09:41</span>
                    <div className="flex items-center space-x-1">
                      <Wifi className="h-2.5 w-2.5" />
                      <Battery className="h-2.5 w-2.5" />
                    </div>
                  </div>

                  {/* App UI Contents */}
                  <div className="space-y-3.5 flex-grow mt-2">
                    
                    {/* App Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs">R</div>
                        <span className="text-[10px] font-bold text-white tracking-wider">RudranPay</span>
                      </div>
                      <span className="bg-amber-500/10 text-amber-400 text-[8px] font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Verified</span>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-slate-950/60 border border-slate-850 p-3 rounded-2xl relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 opacity-10">
                        <Sparkles className="h-10 w-10 text-amber-400" />
                      </div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Wallet balance</p>
                      <p className="text-lg font-black text-white mt-0.5">₹ 14,850.50</p>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Transactions</p>
                      <div className="grid grid-cols-2 gap-2 text-[9px]">
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-850 flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">↑</div>
                          <span className="text-slate-300">Recharge</span>
                        </div>
                        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-850 flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">⇄</div>
                          <span className="text-slate-300">Transfer</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Transaction */}
                    <div className="bg-slate-950/40 border border-slate-850 p-2.5 rounded-xl flex items-center justify-between text-[9px]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                        <div>
                          <p className="font-bold text-slate-300">DTH Top-Up</p>
                          <p className="text-[8px] text-slate-550">Reference ID: RP-48201</p>
                        </div>
                      </div>
                      <span className="font-bold text-white">₹299</span>
                    </div>

                  </div>

                  {/* Home indicator bar */}
                  <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>

                </div>

              </div>

              {/* QuickPay Widget */}
              <div className="w-full max-w-xs shadow-2xl relative z-15 hover:scale-[1.02] transition-transform">
                <QuickPayWidget />
              </div>

            </div>

          </div>
        </div>

        {/* CSS keyframe inject for float and marquee animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(3deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}} />
      </header>

      {/* Main Services Grids (Paytm Style Categories) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: Recharge & Pay Bills */}
        <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                Recharges & Utility Bills
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Instant settlements with automated operator credit hooks</p>
            </div>
            <Link to="/services" className="text-xs font-bold text-amber-600 hover:text-amber-700">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading ? (
              Array(5).fill(0).map((_, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl h-32 animate-pulse"></div>
              ))
            ) : (
              rechargeBills.map(s => (
                <div
                  key={s.id}
                  onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }}
                  className="cursor-pointer group bg-slate-50/50 hover:bg-white border border-transparent hover:border-amber-500/20 hover:shadow-md rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-3 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${getIconGradient(s.id)}`}>
                    <DynamicIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">{s.title}</span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    {s.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 2: Banking & Money Transfers */}
        <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
                Assisted Banking & Money Transfer
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Secure cash withdrawals, local transfers, and lockers</p>
            </div>
            <Link to="/services" className="text-xs font-bold text-amber-600 hover:text-amber-700">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl h-32 animate-pulse"></div>
              ))
            ) : (
              bankingMoney.map(s => (
                <div
                  key={s.id}
                  onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }}
                  className="cursor-pointer group bg-slate-50/50 hover:bg-white border border-transparent hover:border-indigo-500/20 hover:shadow-md rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-3 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${getIconGradient(s.id)}`}>
                    <DynamicIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">{s.title}</span>
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    {s.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Promo Offers Slider section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Offers & Specials</h2>
              <p className="text-xs text-slate-400 mt-0.5">Claim mock promo code cashbacks on transactions</p>
            </div>
            <Link to="/offers" className="text-xs font-bold text-amber-600 hover:text-amber-700">
              View All Offers →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offersList.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between h-44 hover:shadow-md transition-shadow group"
              >
                <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform">
                  <DynamicIcon name="Tag" className="h-32 w-32" />
                </div>
                <div>
                  <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                    PROMO: {offer.code}
                  </span>
                  <h3 className="text-base font-extrabold mt-3 text-white">{offer.title}</h3>
                  <p className="text-[11px] text-slate-450 mt-1 leading-relaxed line-clamp-2">{offer.description}</p>
                </div>
                <div className="pt-2 z-10">
                  <Link 
                    to="/services" 
                    className="text-xs font-bold text-amber-400 hover:text-amber-350 transition-colors flex items-center gap-1"
                  >
                    Apply Now <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paytm-style Mobile App Download Banner */}
        <section id="download-app-banner" className="bg-slate-900 rounded-3xl text-white p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Mobile Merchant App
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Manage transactions on the go with <br />
                <span className="text-amber-400">RudranPay Mobile App</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed">
                Download the merchant installer application to access micro-ATM terminal support, check payouts history, and verify KYC files with biometric scans.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => alert("📥 Downloading Google Play Android APK package...")}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3 transition-colors text-left"
                >
                  <Smartphone className="h-6 w-6 text-amber-400" />
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Download for</p>
                    <p className="text-xs font-bold text-white">Android Devices</p>
                  </div>
                </button>
                <button
                  onClick={() => alert("📥 Apple TestFlight iOS bundle download queued...")}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl px-5 py-3 flex items-center gap-3 transition-colors text-left"
                >
                  <Smartphone className="h-6 w-6 text-indigo-400" />
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Download for</p>
                    <p className="text-xs font-bold text-white">Apple iOS App</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-40 h-40 bg-slate-950 rounded-2xl border border-slate-800 p-3 shadow-inner flex flex-col justify-between text-center relative overflow-hidden group">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Scan to Download</span>
                {/* Mock QR icon */}
                <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center p-1.5 border border-slate-200">
                  <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-white text-[8px] font-bold">
                    QR CODE
                  </div>
                </div>
                <span className="text-[9px] text-slate-400">RudranPay APK v1.2</span>
              </div>
            </div>

          </div>
        </section>

        {/* New Section: How It Works */}
        <section className="py-12 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900">How RudranPay Works</h2>
            <p className="text-sm text-slate-500 mt-2">Start accepting payments and providing services in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
            
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center relative">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-4 border-white shadow-md">1</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Create Account</h3>
              <p className="text-xs text-slate-500">Sign up in seconds. Verify your KYC completely online without any paperwork.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center relative">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-4 border-white shadow-md">2</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Add Funds</h3>
              <p className="text-xs text-slate-500">Load money into your merchant wallet instantly via UPI, Netbanking, or Debit Card.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center relative">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 border-4 border-white shadow-md">3</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Start Transacting</h3>
              <p className="text-xs text-slate-500">Provide services to customers and earn commissions instantly on every successful transaction.</p>
            </div>
          </div>
        </section>

        {/* New Section: Stats & Achievements */}
        <section className="bg-slate-950 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl border border-slate-800 my-16">
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-2">1M+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Merchants</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-2">₹500Cr+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Daily Volume</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-2">99.9%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Server Uptime</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-rose-400 mb-2">24/7</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Live Support</p>
            </div>
          </div>
        </section>

        {/* Section 3: Trust and Badges */}
        <section className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Why Customers Trust RudranPay</h2>
            <p className="text-sm text-slate-500 mt-1">We guarantee secure network transactions and fast manual assisted support</p>
          </div>
          <TrustBadges />
        </section>

      </div>

      {/* UPI Transfers Section (Paytm Style) */}
      <section className="bg-slate-50 py-12 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Side */}
              <div className="space-y-6">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">RudranPay</span>
                  <span className="text-xl font-black text-rose-500">UPI</span>
                  <div className="flex gap-1 ml-1 text-green-500">
                    <Check className="w-5 h-5" strokeWidth={4} />
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.15]">
                  Pay anyone directly <br className="hidden lg:block"/> from your <span className="text-blue-500">bank<br className="hidden lg:block"/> account</span>
                </h2>
                <p className="text-slate-600 text-[1.1rem] leading-relaxed max-w-lg">
                  Pay anyone, everywhere. Make contactless & secure payments in-stores or online using RudranPay UPI or Directly from your Bank Account. Plus, send & receive money from anyone.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="bg-slate-950 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors flex items-center gap-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[0.65rem] opacity-80 leading-none mb-1">Download on the</div>
                      <div className="text-sm font-bold leading-none">App Store</div>
                    </div>
                  </button>
                  <button className="bg-slate-950 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors flex items-center gap-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M14.77 13.08L16.08 14.39L4.85 20.84L14.77 13.08M14.77 10.92L4.85 3.16L16.08 9.61L14.77 10.92M17.15 10.23L20.31 12L17.15 13.77L15.35 12L17.15 10.23Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[0.65rem] opacity-80 leading-none mb-1">GET IT ON</div>
                      <div className="text-sm font-bold leading-none">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative flex justify-center w-full">
                <img src={upiAvatarsImg} alt="RudranPay UPI Transfers" className="w-full max-w-lg object-contain mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RudranPay for Business Section */}
      <section className="bg-slate-50 py-16 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 md:p-12 lg:p-16 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="space-y-6">
              <div className="text-amber-600 font-extrabold text-xl sm:text-2xl flex items-center gap-1">
                <span className="text-slate-900">RudranPay</span> for <span className="text-blue-500">Business</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                Payments that power your <span className="text-blue-500">growth</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                Accept every payment your business needs—from UPI and cards to EMI—with trusted solutions like RudranPay QR, Soundbox, and Card Machine.
                Whether you're starting out or growing your business, becoming a merchant takes just minutes.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => alert("Downloading App...")} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-full transition-colors flex items-center gap-2">
                  Download App <ArrowRight className="h-4 w-4" />
                </button>
                <Link to="/business" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-colors flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative flex justify-center">
              <img src={businessHeroImg} alt="RudranPay for Business" className="w-full max-w-lg object-contain mix-blend-multiply z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
          
          {/* Moving Marquee */}
          <div className="mt-16 border-t border-slate-200 pt-10 overflow-hidden relative">
            <p className="text-center text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Trusted by growing businesses</p>
            <div className="flex w-[200%] animate-marquee">
              {/* First set */}
              <div className="flex w-1/2 justify-around items-center">
                {[
                  { name: 'Retail Shops', color: 'text-blue-600' },
                  { name: 'Pharmacies', color: 'text-emerald-600' },
                  { name: 'Supermarkets', color: 'text-amber-500' },
                  { name: 'Restaurants', color: 'text-rose-600' },
                  { name: 'Freelancers', color: 'text-purple-600' },
                  { name: 'Wholesalers', color: 'text-indigo-600' }
                ].map(item => (
                  <span key={item.name} className={`text-2xl font-black ${item.color} mx-8`}>{item.name}</span>
                ))}
              </div>
              {/* Duplicate set for infinite scrolling */}
              <div className="flex w-1/2 justify-around items-center">
                {[
                  { name: 'Retail Shops', color: 'text-blue-600' },
                  { name: 'Pharmacies', color: 'text-emerald-600' },
                  { name: 'Supermarkets', color: 'text-amber-500' },
                  { name: 'Restaurants', color: 'text-rose-600' },
                  { name: 'Freelancers', color: 'text-purple-600' },
                  { name: 'Wholesalers', color: 'text-indigo-600' }
                ].map(item => (
                  <span key={item.name+"2"} className={`text-2xl font-black ${item.color} mx-8`}>{item.name}</span>
                ))}
              </div>
              </div>
            </div>
          </div>
          
          {/* 24x7 Customer Support Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-full flex flex-col md:flex-row items-center justify-between p-3 md:px-8 md:py-3 shadow-xl w-full mb-8">
            <div className="flex items-center gap-4">
               {/* Custom RudranPay Logo Badge */}
               <div className="w-14 h-14 bg-white rounded-full flex flex-col items-center justify-center flex-shrink-0 shadow-sm border-2 border-amber-500/20">
                 <span className="font-black text-amber-550 text-[10px] leading-tight">RudranPay</span>
                 <div className="flex items-center gap-0.5 mt-0.5">
                   <div className="w-2 h-0.5 bg-slate-800 rounded-full"></div>
                   <Heart className="w-2 h-2 text-rose-500 fill-current" />
                   <div className="w-2 h-0.5 bg-emerald-500 rounded-full"></div>
                 </div>
                 <span className="font-bold text-slate-700 text-[9px] leading-tight mt-0.5 tracking-widest">UPI</span>
               </div>
               
               <p className="text-white font-bold text-sm md:text-base lg:text-[1.1rem]">
                 24×7 Trusted customer support to assist and help you in every step of your journey
               </p>
            </div>
            
            <Link to="/contact" className="mt-4 md:mt-0 whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 text-sm shadow-md shadow-amber-500/20">
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
}
