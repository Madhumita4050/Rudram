import React, { useState, useEffect } from 'react';
import { getOffers } from '../api/offers';
import { Tag, Check } from 'lucide-react';

export default function Offers() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOffers().then((data) => {
      setPromoCodes(data);
      setLoading(false);
    });
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Promo Offers & Cashbacks</h1>
          <p className="text-sm text-slate-500 mt-2">Save extra on utility bills, recharges, and online financial transactions.</p>
        </div>

        {/* Promo Codes List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(2).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-150 animate-pulse h-40"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promoCodes.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                {/* Decorative circle */}
                <div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 rounded-full transform translate-x-8 -translate-y-8 flex items-center justify-center text-slate-100 font-bold text-4xl">
                  %
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Tag className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Active Offer</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{offer.title}</h3>
                  <p className="text-xs text-slate-550 mt-1.5 leading-relaxed">{offer.description}</p>
                </div>

                {/* Promo Code Box */}
                <div className="mt-6 flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Use Promo Code</span>
                    <span className="text-sm font-bold text-slate-900 tracking-wider">{offer.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                      copiedCode === offer.code
                        ? 'bg-emerald-650 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="h-3 w-3" /> Copied!
                      </>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
