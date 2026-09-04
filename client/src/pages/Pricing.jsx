import React from 'react';
import { Check, Info, PhoneCall } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-20">
      <header className="bg-slate-950 text-white py-16 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Transparent & Simple Pricing
          </h1>
          <p className="text-slate-400 text-lg">
            No hidden fees, no setup charges. Only pay for successful transactions.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Transaction Fees Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-16">
          <div className="p-8 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900">Standard Transaction Fees</h2>
            <p className="text-sm text-slate-500 mt-1">Rates applicable for all standard accounts.</p>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="px-8 py-4 font-semibold">Payment Method</th>
                  <th className="px-8 py-4 font-semibold">Transaction Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-slate-900">UPI</td>
                  <td className="px-8 py-5 font-bold text-amber-600">0% <span className="text-slate-400 font-normal text-xs">(Free)</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-slate-900">RuPay Debit Cards</td>
                  <td className="px-8 py-5 font-bold text-amber-600">0% <span className="text-slate-400 font-normal text-xs">(Free)</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-slate-900">Netbanking</td>
                  <td className="px-8 py-5 font-semibold text-slate-700">1.8% <span className="text-slate-400 font-normal text-xs">per transaction</span></td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-slate-900">Credit Cards & Wallets</td>
                  <td className="px-8 py-5 font-semibold text-slate-700">2.0% <span className="text-slate-400 font-normal text-xs">per transaction</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border-2 border-amber-500 relative shadow-lg">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-bl-xl rounded-tr-2xl">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Startup / Business</h3>
            <p className="text-slate-500 text-sm mb-6">Perfect for growing businesses and startups.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-500" /> <span className="text-slate-700">Zero Setup Fee</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-500" /> <span className="text-slate-700">Zero Maintenance Fee</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-500" /> <span className="text-slate-700">T+1 Day Settlement</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-500" /> <span className="text-slate-700">Standard API Access</span></div>
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
              Create Account
            </button>
          </div>

          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-slate-400 text-sm mb-6">Custom pricing for high-volume businesses.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-400" /> <span className="text-slate-300">Discounted Transaction Rates</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-400" /> <span className="text-slate-300">Same Day Settlement (T+0)</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-400" /> <span className="text-slate-300">Dedicated Key Account Manager</span></div>
              <div className="flex items-center gap-3"><Check className="h-5 w-5 text-amber-400" /> <span className="text-slate-300">Custom Integration Support</span></div>
            </div>
            <button className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors flex justify-center items-center gap-2">
              <PhoneCall className="h-5 w-5" /> Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500" /> Is there any setup or hidden fee?
              </h4>
              <p className="text-slate-600 text-sm">No, RudranPay is completely transparent. There are absolutely no setup fees, maintenance fees, or hidden charges.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500" /> Does the fee include GST?
              </h4>
              <p className="text-slate-600 text-sm">No, 18% GST will be applicable on the transaction fee amount as per government regulations.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500" /> What is the settlement time?
              </h4>
              <p className="text-slate-600 text-sm">Standard settlement time is T+1 working days. This means payments received today will be credited to your bank account by the next working day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
