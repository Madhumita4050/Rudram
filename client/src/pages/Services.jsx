import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import DynamicIcon from '../components/DynamicIcon';
import { getServices } from '../api/services';

export default function Services() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Recharge & Bills', 'Banking & Money', 'Identity & Govt', 'Travel'];

  useEffect(() => {
    getServices().then((data) => {
      setAllServices(data);
      setFilteredServices(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = allServices;

    // Filter by Tab Category
    if (activeTab !== 'All') {
      result = result.filter((s) => s.category && s.category.trim().toLowerCase() === activeTab.trim().toLowerCase());
    }

    // Filter by Search query
    if (searchQuery.trim() !== '') {
      result = result.filter((s) =>
        (s.title && s.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredServices(result);
  }, [searchQuery, activeTab, allServices]);

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
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Digital Services
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-500 sm:mt-4">
            Search and select from our 12 popular assisted financial and payment services.
          </p>
        </div>

        {/* Search Bar & Tabs Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-white border border-slate-200 p-1.5 rounded-xl w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse h-48">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100"></div>
                  <div className="w-16 h-5 bg-slate-100 rounded"></div>
                </div>
                <div className="h-5 bg-slate-100 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center max-w-md mx-auto">
            <p className="text-base text-slate-500 font-semibold mb-2">No services found</p>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or switching filter tabs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={(e) => { e.preventDefault(); alert("📥 RudranPay Mobile Application downloading started (APK format for testing)..."); }}
                className="cursor-pointer bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-amber-500/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-56 relative overflow-hidden group"
              >
                {/* Tag Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-50 text-amber-600 border border-amber-200/50 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {service.tag}
                  </span>
                </div>

                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${getIconGradient(service.id)}`}>
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 text-xs font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                  DOWNLOAD THE APP
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
