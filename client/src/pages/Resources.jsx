import React from 'react';
import { Newspaper, Book, Video, Download } from 'lucide-react';

export default function Resources() {
  const articles = [
    { title: "How to Integrate UPI in 5 Minutes", category: "Tutorial", tag: "Tech", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Protecting your Business from Chargebacks", category: "Guide", tag: "Security", color: "text-rose-600", bg: "bg-rose-50" },
    { title: "RudranPay vs Other Gateways: A Comparison", category: "Article", tag: "Business", color: "text-amber-600", bg: "bg-amber-50" },
    { title: "New RBI Guidelines for Payment Aggregators", category: "News", tag: "Compliance", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-20">
      <header className="bg-slate-950 text-white py-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Blog & Resources
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about digital payments, product updates, and business growth.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-indigo-600 opacity-90 flex items-center justify-center">
              <Newspaper className="h-20 w-20 text-white/50" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">Product Update</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Introducing Instant Settlements for all Business Accounts</h2>
            <p className="text-slate-500 mb-6">We are thrilled to announce that starting this month, eligible businesses can opt for T+0 instant settlements...</p>
            <button className="text-amber-600 font-bold hover:text-amber-700">Read Full Story →</button>
          </div>
        </div>

        {/* Latest Articles */}
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Latest Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {articles.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${item.bg} ${item.color} mb-3 inline-block`}>
                {item.category}
              </span>
              <h4 className="font-bold text-slate-900 mb-3 line-clamp-2">{item.title}</h4>
              <p className="text-xs text-slate-500 mb-4">Read about the latest updates and best practices...</p>
              <button className="text-sm font-semibold text-slate-700 hover:text-amber-600">Read More</button>
            </div>
          ))}
        </div>

        {/* Downloadable Resources */}
        <div className="bg-slate-950 rounded-3xl p-8 lg:p-12 text-white border border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 max-w-xl">
            <h3 className="text-2xl font-bold mb-3">Free eBook: The Future of FinTech in India</h3>
            <p className="text-slate-400 text-sm">Download our comprehensive 50-page guide on how digital payments are evolving and how your business can stay ahead.</p>
          </div>
          <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2">
            <Download className="h-5 w-5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
