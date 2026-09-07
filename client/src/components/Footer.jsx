import React from 'react';
import { Link } from 'react-router-dom';
import logoFullImg from '../assets/logo_full.png';
import { Shield, Sparkles, HelpCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e3efff] text-slate-600 pt-16 pb-8 border-t border-[#cde2fd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1: Logo & Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src={logoFullImg} alt="RudranPay Logo" className="h-9 object-contain group-hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
              India's premier digital services and banking-correspondent platform for assisted financial payouts, recharges, and utility bills.
            </p>
            <div className="flex space-x-3">
              {['facebook', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <span
                  key={social}
                  className="w-8 h-8 rounded-full bg-white/90 border border-[#cde2fd] flex items-center justify-center text-xs font-bold uppercase text-slate-700 cursor-pointer shadow-2xs hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Recharge & Bills */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Recharge & Bills</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Mobile Recharge</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">FASTag Recharge</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Utility Bills</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Insurance Premium</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Loan EMI Payment</a></li>
            </ul>
          </div>

          {/* Col 3: Banking & Money */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Banking & Money</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Money Transfer (DMT)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Aadhaar Banking (AEPS)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Micro-ATM & Kiosks</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-slate-950 transition-colors">Digital Gold</a></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/about" className="hover:text-slate-950 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-slate-950 transition-colors">Contact Us</Link></li>
              <li><Link to="/resources" className="hover:text-slate-950 transition-colors">Blog & Resources</Link></li>
              <li><Link to="/developers" className="hover:text-slate-950 transition-colors">Developers API</Link></li>
              <li><Link to="/pricing" className="hover:text-slate-950 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Legal & Policies</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/privacy-policy" className="hover:text-slate-950 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-slate-950 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-slate-950 transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-slate-950 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/grievance" className="hover:text-slate-950 transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Line Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-[#cde2fd] text-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm text-slate-900">100% Secure Payments</p>
              <p className="text-xs text-slate-600">PCI-DSS compliant sandbox checkouts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm text-slate-900">Instant Credit</p>
              <p className="text-xs text-slate-600">Automated processing for instant settlements.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm text-slate-900">24/7 Support Desk</p>
              <p className="text-xs text-slate-600">Dedicated assistance for manual processing.</p>
            </div>
          </div>
        </div>

        {/* Bottom Safety Bar & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div>
            <p className="mb-2 text-slate-700">© {currentYear} RudranPay Digital Services. All rights reserved.</p>
            <p className="text-amber-700 font-semibold flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Safety Tip: Never share your OTP, password, or PIN code with anyone claiming to represent RudranPay.
            </p>
          </div>

          {/* Simulated Payment Badges */}
          <div className="flex items-center space-x-2 text-slate-700 text-[10px] font-bold">
            <span className="px-2.5 py-1 bg-white/90 border border-[#cde2fd] rounded shadow-2xs">UPI</span>
            <span className="px-2.5 py-1 bg-white/90 border border-[#cde2fd] rounded shadow-2xs">CARDS</span>
            <span className="px-2.5 py-1 bg-white/90 border border-[#cde2fd] rounded shadow-2xs">NETBANKING</span>
            <span className="px-2.5 py-1 bg-white/90 border border-[#cde2fd] rounded shadow-2xs">CASHFREE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
