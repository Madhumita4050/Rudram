import React, { useState } from 'react';
import { Terminal, Code, BookOpen, Smartphone, Zap, GitBranch, Box, Server, Shield, X, CheckCircle2 } from 'lucide-react';

export default function Developers() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'quick-start',
      title: 'Quick Start Guide',
      shortDesc: 'Get up and running with RudranPay integration in under 5 minutes.',
      btnText: 'Read Guide →',
      icon: Zap,
      colorClass: 'bg-amber-50 text-amber-600',
      btnClass: 'text-amber-600 hover:text-amber-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">Follow our comprehensive step-by-step guide to quickly integrate RudranPay into your platform. Designed for developers of all skill levels.</p>
          <h4 className="font-bold text-slate-800 border-b pb-2">Integration Steps:</h4>
          <ol className="list-decimal pl-5 space-y-3 text-slate-700">
            <li><strong>Account Creation:</strong> Register on the RudranPay dashboard and complete KYC.</li>
            <li><strong>API Keys:</strong> Navigate to <span className="font-semibold">Settings &gt; API Keys</span> to generate your Test credentials.</li>
            <li><strong>Initiate Payment:</strong> Use our backend SDKs to create an order instance.</li>
            <li><strong>Checkout UI:</strong> Embed our Drop-in UI or use our customizable checkout components on your frontend.</li>
            <li><strong>Verify Signature:</strong> Securely verify the payment signature on your backend to confirm the transaction.</li>
          </ol>
          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-sm mt-6 shadow-inner">
            <span className="text-green-400"># Install the React native package</span><br />
            npm install @rudranpay/react-native
          </div>
        </div>
      )
    },
    {
      id: 'api-ref',
      title: 'API Reference',
      shortDesc: 'Comprehensive details on endpoints (Create Order, Refunds, Verifications).',
      btnText: 'Explore APIs →',
      icon: BookOpen,
      colorClass: 'bg-indigo-50 text-indigo-600',
      btnClass: 'text-indigo-600 hover:text-indigo-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">Our RESTful APIs allow you to build completely custom payment flows. They accept JSON-encoded request bodies, return JSON-encoded responses, and use standard HTTP response codes.</p>
          <h4 className="font-bold text-slate-800 border-b pb-2">Core Endpoints:</h4>
          <div className="space-y-3 mt-4">
            <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
              <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-xs w-14 text-center">POST</span>
              <code className="text-sm font-semibold text-slate-700">/v1/orders</code>
              <span className="text-sm text-slate-500 ml-auto hidden sm:block">Create a new Order</span>
            </div>
            <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
              <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs w-14 text-center">GET</span>
              <code className="text-sm font-semibold text-slate-700">/v1/payments/:id</code>
              <span className="text-sm text-slate-500 ml-auto hidden sm:block">Fetch Payment Details</span>
            </div>
            <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow">
              <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded text-xs w-14 text-center">POST</span>
              <code className="text-sm font-semibold text-slate-700">/v1/payments/:id/refund</code>
              <span className="text-sm text-slate-500 ml-auto hidden sm:block">Issue full/partial Refund</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      shortDesc: 'Ready-made packages for Node.js, PHP, Python, Java, Android, and iOS.',
      btnText: 'Download SDKs →',
      icon: Code,
      colorClass: 'bg-rose-50 text-rose-600',
      btnClass: 'text-rose-600 hover:text-rose-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">We provide official SDKs for all major backend languages and frontend frameworks to significantly reduce your integration time and effort.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="border border-slate-200 rounded-xl p-4 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center">
               <div className="font-bold text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">Node.js</div>
               <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">npm install rudranpay</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center">
               <div className="font-bold text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">Python</div>
               <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">pip install rudranpay</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center">
               <div className="font-bold text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">PHP</div>
               <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">composer require rudranpay</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center">
               <div className="font-bold text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">Java</div>
               <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">Maven / Gradle</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'samples',
      title: 'Sample Repositories',
      shortDesc: 'Copy-paste ready example projects on GitHub for quick integrations.',
      btnText: 'View GitHub →',
      icon: GitBranch,
      colorClass: 'bg-slate-800 text-white',
      btnClass: 'text-slate-900 hover:text-slate-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">Don't want to start from scratch? Check out our official open-source GitHub repositories containing fully functional sample applications.</p>
          <ul className="space-y-3 mt-6">
            <li className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
              <div>
                <div className="font-bold text-slate-800 text-sm sm:text-base">React + Node.js E-commerce</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">Full stack integration example with cart</div>
              </div>
              <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 font-semibold transition-colors">Clone</button>
            </li>
            <li className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
              <div>
                <div className="font-bold text-slate-800 text-sm sm:text-base">Django Subscription App</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">Recurring payments and webhooks setup</div>
              </div>
              <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 font-semibold transition-colors">Clone</button>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'sandbox',
      title: 'Sandbox / Test Mode',
      shortDesc: 'Use our test API keys to simulate fake transactions before going live.',
      btnText: 'Get Test Keys →',
      icon: Box,
      colorClass: 'bg-amber-50 text-amber-600',
      btnClass: 'text-amber-600 hover:text-amber-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">Our Sandbox environment perfectly mirrors the production environment, allowing you to thoroughly test your integration without moving real money or affecting live data.</p>
          <h4 className="font-bold text-slate-800 border-b pb-2">Magic Test Cards:</h4>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
            <div className="flex justify-between border-b border-slate-200 pb-2 mb-3">
              <span className="text-sm font-bold text-slate-700">Test Scenario</span>
              <span className="text-sm font-bold text-slate-700">Card Number</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:items-center gap-2 sm:gap-0">
              <span className="text-sm font-medium text-slate-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Successful Payment</span>
              <span className="text-sm font-mono bg-white px-3 py-1 rounded-md border text-slate-700 shadow-sm">4111 1111 1111 1111</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:items-center gap-2 sm:gap-0">
              <span className="text-sm font-medium text-slate-600 flex items-center gap-2"><X className="w-4 h-4 text-red-500"/> Failed (Insufficient Funds)</span>
              <span className="text-sm font-mono bg-white px-3 py-1 rounded-md border text-slate-700 shadow-sm">4000 0000 0000 0002</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:items-center gap-2 sm:gap-0">
              <span className="text-sm font-medium text-slate-600 flex items-center gap-2"><X className="w-4 h-4 text-orange-500"/> OTP Timeout</span>
              <span className="text-sm font-mono bg-white px-3 py-1 rounded-md border text-slate-700 shadow-sm">4000 0000 0000 0005</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic mt-2">* Any future expiry date and random 3-digit CVV will work with test cards.</p>
        </div>
      )
    },
    {
      id: 'webhooks',
      title: 'Webhooks Guide',
      shortDesc: 'Set up real-time notifications for payment success, failure, and refunds.',
      btnText: 'Setup Webhooks →',
      icon: Server,
      colorClass: 'bg-sky-50 text-sky-600',
      btnClass: 'text-sky-600 hover:text-sky-700',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">Webhooks are asynchronous POST requests sent by RudranPay to your server to notify you about events that happen on your account. They are critical for ensuring your system stays in sync with payment statuses.</p>
          <h4 className="font-bold text-slate-800 border-b pb-2">Crucial Events to Listen For:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 font-medium">
            <li><code className="bg-slate-100 px-1 rounded text-slate-800">order.paid</code> - Triggered when a customer successfully completes a payment.</li>
            <li><code className="bg-slate-100 px-1 rounded text-slate-800">payment.failed</code> - Triggered when a payment attempt fails.</li>
            <li><code className="bg-slate-100 px-1 rounded text-slate-800">refund.processed</code> - Triggered when a refund is successfully processed to the customer.</li>
          </ul>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6 rounded-r-lg">
            <h5 className="font-bold text-amber-800 flex items-center gap-2 mb-1"><Shield className="w-4 h-4"/> Security Tip</h5>
            <p className="text-sm text-amber-700">Always verify the webhook signature using your webhook secret to ensure the payload originated from RudranPay and was not tampered with during transit.</p>
          </div>
        </div>
      )
    },
  ];

  // Helper to close modal on background click
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedFeature(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-20 relative">
      {/* Header */}
      <header className="bg-slate-950 text-white py-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Developers & API Docs
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Integrate RudranPay's powerful APIs into your website or app. Everything you need to build secure and lightning-fast payment flows.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
              >
                <div className={`w-12 h-12 ${feature.colorClass} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">{feature.shortDesc}</p>
                <button className={`${feature.btnClass} font-semibold text-sm self-start flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  {feature.btnText.replace('→', '')} <span>&rarr;</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-950 to-slate-900 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="mb-6 md:mb-0 md:mr-8 relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">Ready to test our APIs?</h3>
            <p className="text-slate-400 text-sm md:text-base max-w-md">Download our Postman Collection with all endpoints pre-configured. Start making requests in seconds.</p>
          </div>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 whitespace-nowrap flex items-center gap-3 relative z-10 text-lg">
            <Terminal className="h-6 w-6" /> Get Postman Collection
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={handleModalClick}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${selectedFeature.colorClass} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <selectedFeature.icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{selectedFeature.title}</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">{selectedFeature.shortDesc}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
              {selectedFeature.content}
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedFeature(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
