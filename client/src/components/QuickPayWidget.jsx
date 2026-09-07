import React from 'react';
import { Smartphone, Download, Shield } from 'lucide-react';

export default function QuickPayWidget() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border-4 border-slate-950/5 p-6 max-w-md w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
      
      <div className="flex flex-col items-center text-center relative z-10 py-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 mb-5">
          <Smartphone className="h-8 w-8" />
        </div>
        
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">Get the RudranPay App</h3>
        <p className="text-sm text-slate-500 mb-8 max-w-[250px]">
          Experience seamless, ultra-fast payments and direct bank settlements on your mobile.
        </p>
        
        <div className="w-full space-y-3">
          <button 
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-download-modal'))}
            className="w-full bg-slate-950 hover:bg-slate-850 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Download className="h-5 w-5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" /> 
            Download for Android
          </button>
          
          <button 
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-download-modal'))}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="h-5 w-5 text-slate-400" /> 
            Download for iOS
          </button>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <Shield className="h-3.5 w-3.5 text-emerald-500" /> 100% Safe & Secure
        </div>
      </div>
    </div>
  );
}
