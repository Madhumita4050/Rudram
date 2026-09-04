import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { Shield, Sparkles, HelpCircle, PhoneCall } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Logo & Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="RudranPay Logo" className="h-9 w-9 object-contain rounded-md" />
              <span className="text-white text-lg font-bold">RudranPay</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              India's premier digital services and banking-correspondent platform for assisted financial payouts, recharges, and utility bills.
            </p>
            <div className="flex space-x-3">
              {['facebook', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <span 
                  key={social} 
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold uppercase text-slate-300 cursor-pointer hover:bg-amber-600 hover:text-white transition-colors"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Recharge & Bills */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recharge & Bills</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Mobile Recharge</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">FASTag Recharge</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Utility Bills</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Insurance Premium</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Loan EMI Payment</a></li>
            </ul>
          </div>

          {/* Col 3: Banking & Money */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Banking & Money</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Money Transfer (DMT)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Aadhaar Banking (AEPS)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Micro-ATM & Kiosks</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }} className="hover:text-white transition-colors">Digital Gold</a></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Blog & Resources</Link></li>
              <li><Link to="/developers" className="hover:text-white transition-colors">Developers API</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal & Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/grievance" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Line Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-slate-800 text-slate-300 mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">100% Secure Payments</p>
              <p className="text-xs text-slate-500">PCI-DSS compliant sandbox checkouts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Instant Credit</p>
              <p className="text-xs text-slate-500">Automated processing for instant settlements.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-blue-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">24/7 Support Desk</p>
              <p className="text-xs text-slate-500">Dedicated assistance for manual processing.</p>
            </div>
          </div>
        </div>

        {/* Bottom Safety Bar & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="mb-2">© {currentYear} RudranPay Digital Services. All rights reserved.</p>
            <p className="text-amber-500 font-semibold flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Safety Tip: Never share your OTP, password, or PIN code with anyone claiming to represent RudranPay.
            </p>
          </div>
          
          {/* Simulated Payment Badges */}
          <div className="flex items-center space-x-2 text-slate-500 text-[10px]">
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">UPI</span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">CARDS</span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">NETBANKING</span>
            <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">CASHFREE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
