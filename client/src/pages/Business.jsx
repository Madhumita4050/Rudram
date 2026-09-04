import React from 'react';
import { ArrowRight, CheckCircle2, Zap, BarChart3, Speaker, Smartphone, CreditCard } from 'lucide-react';
import businessHeroImg from '../assets/premium_business_hero.png';

export default function Business() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 lg:py-24 border-b border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Side */}
            <div className="space-y-6 z-10 relative">
              <div className="text-amber-600 font-extrabold text-xl sm:text-2xl flex items-center gap-1">
                <span className="text-slate-900">RudranPay</span> for <span className="text-blue-600">Business</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
                Payments that power your <span className="text-blue-500">growth</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                Accept every payment your business needs—from UPI and cards to EMI—with trusted solutions like RudranPay QR, Soundbox and Card Machine. Whether you're starting out or growing your business, becoming a RudranPay for Business merchant takes just minutes.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-full transition-colors flex items-center gap-2">
                  Download App <ArrowRight className="h-4 w-4" />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Premium Image Side */}
            <div className="relative flex justify-center lg:justify-end z-10">
              <img 
                src={businessHeroImg} 
                alt="RudranPay for Business" 
                className="w-full max-w-lg xl:max-w-xl object-contain mix-blend-multiply"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* CSS for Marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}} />
      </section>

      {/* Marquee Section */}
      <section className="bg-white border-b border-slate-100 py-8 overflow-hidden relative">
        <p className="text-center text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">Trusted by growing businesses</p>
        <div className="flex w-[200%] animate-marquee">
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
      </section>

      {/* Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Everything you need to accept payments</h2>
          <p className="text-lg text-slate-500">Provide a seamless payment experience for your customers with our suite of modern hardware and software solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* QR */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">All-in-One QR Code</h3>
            <p className="text-slate-600 mb-6">Accept payments from any UPI app directly into your bank account at zero transaction fees.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant activation</li>
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlimited settlements</li>
            </ul>
            <button className="text-blue-600 font-bold hover:text-blue-700">Order QR Code →</button>
          </div>

          {/* Soundbox */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow border-t-4 border-t-blue-500 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl rounded-tr-2xl">Bestseller</div>
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Speaker className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">RudranPay Soundbox</h3>
            <p className="text-slate-600 mb-6">Get instant audio confirmations for all your payments and prevent fraud at your storefront.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Multiple languages</li>
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Long battery life</li>
            </ul>
            <button className="text-amber-600 font-bold hover:text-amber-700">Get Soundbox →</button>
          </div>

          {/* Card Machine */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart POS Machine</h3>
            <p className="text-slate-600 mb-6">Accept credit cards, debit cards, and NFC payments with our sleek, battery-powered card swipe machines.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Built-in printer</li>
              <li className="flex items-center gap-2 text-sm text-slate-700 font-semibold"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> EMI support</li>
            </ul>
            <button className="text-purple-600 font-bold hover:text-purple-700">Explore POS →</button>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-6">Why upgrade to RudranPay for Business?</h2>
              <div className="space-y-8 mt-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Instant Settlements</h4>
                    <p className="text-slate-400 text-sm">Choose T+0 settlements and get money in your bank account the same day, helping you manage cash flow better.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Powerful Dashboard</h4>
                    <p className="text-slate-400 text-sm">Track your daily sales, view transaction histories, and generate detailed reports to understand your business growth.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 relative">
              <h3 className="text-2xl font-bold mb-8">Ready to grow your business?</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Mobile Number" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="Business Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors">
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
