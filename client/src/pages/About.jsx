import React from 'react';
import { ShieldCheck, Users, Target, Building2 } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Intro */}
        <div className="text-center mb-16 space-y-4">
          <img src={logoImg} alt="RudranPay Logo" className="h-20 w-20 mx-auto object-contain" />
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">About RudranPay</h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Empowering neighborhood retail stores, micro-ATMs, and digital kiosks with safe, robust fintech payouts and utility billing integrations.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Assisted Retail Network</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We bring online payments closer to non-tech-savvy consumers using locally trusted merchant networks and physical kiosks.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Fintech Sandbox Environment</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Integrated with Cashfree sandbox checkouts, allowing merchants to safely test payment processing without risking real currency.
              </p>
            </div>
          </div>

        </div>

        {/* Core Values / Stats */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white text-center">
          <h3 className="text-lg font-bold">Leading the Banking Correspondent Sector</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
            RudranPay functions as an agent interface, facilitating cash withdrawals, money transfer payouts, and utility recharges.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div>
              <p className="text-2xl font-extrabold text-amber-400">12+</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Core Services</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-400">100%</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Sandbox Safe</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-400">24/7</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Assisted Support</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
