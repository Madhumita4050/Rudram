import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wallet,
  ArrowUpRight,
  PlusCircle,
  FileCheck,
  CreditCard,
  Smartphone,
  Tv,
  Zap,
  Droplet,
  Plane,
  Tag,
  Flame,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  User,
  ExternalLink,
  History as HistoryIcon,
  HelpCircle
} from 'lucide-react';
import { getUserDashboardSummary } from '../api/user';
import DynamicIcon from '../components/DynamicIcon';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }

    getUserDashboardSummary()
      .then((res) => {
        setData(res);
        if (res.user) setUser(res.user);
      })
      .catch((err) => {
        console.warn('Could not load user dashboard API:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const quickServices = [
    { title: 'Mobile Recharge', icon: 'Smartphone', path: '/services/1', category: 'Recharge', color: 'bg-amber-50 text-amber-600' },
    { title: 'Electricity Bill', icon: 'Zap', path: '/services/3', category: 'Utility', color: 'bg-yellow-50 text-yellow-600' },
    { title: 'DTH Recharge', icon: 'Tv', path: '/services/2', category: 'Recharge', color: 'bg-sky-50 text-sky-600' },
    { title: 'Water Bill', icon: 'Droplet', path: '/services/4', category: 'Utility', color: 'bg-blue-50 text-blue-600' },
    { title: 'Credit Card Bill', icon: 'CreditCard', path: '/services/5', category: 'Finance', color: 'bg-purple-50 text-purple-600' },
    { title: 'Flight Booking', icon: 'Plane', path: '/services/6', category: 'Travel', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const registrations = data?.registrations || [];
  const recentRequests = data?.recentRequests || [];
  const walletBalance = data?.walletBalance || user?.walletBalance || 0;

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-amber-500/40 flex items-center justify-center font-black text-2xl text-amber-400 shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Welcome, {user?.name || 'Valued User'}!
                  </h1>
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{user?.email}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> KYC Verified
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                Explore All Services
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all"
              >
                Profile Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Top Cards Grid: Wallet & Application Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rudran Wallet</span>
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">
                ₹ {walletBalance.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-1">Available for 1-click bill payments & recharges</p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => alert("Wallet recharge portal: Razorpay payment gateway will open.")}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all text-center"
              >
                + Add Money
              </button>
              <Link
                to="/history"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              >
                Passbook
              </Link>
            </div>
          </div>

          {/* Citizen Application Status Card */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-slate-900 text-base">Your Registration Status</h2>
                </div>

                <Link
                  to="/register"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>New Application</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {registrations.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Become an Official Partner or Founder Member</p>
                    <p className="text-[11px] text-slate-500">Apply for Field Officer, Personal Assistance, or Founder Member today.</p>
                  </div>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl whitespace-nowrap shadow-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.slice(0, 2).map((reg) => (
                    <div
                      key={reg.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          # {reg.id}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{reg.role}</p>
                          <p className="text-[11px] text-slate-500">{reg.district || 'Location'}, {reg.state}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                            reg.paymentStatus === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {reg.paymentStatus === 'Completed' ? 'Verified / Paid' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Customer Helpline: 1800-889-7600</span>
              <Link to="/grievance" className="text-amber-600 font-semibold hover:underline">
                Raise Support Ticket
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Launch Services Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Instant Digital Services</h2>
            <Link to="/services" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>View All 15+ Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {quickServices.map((svc) => (
              <Link
                key={svc.title}
                to={svc.path}
                className="bg-white border border-slate-200/80 hover:border-amber-400/80 rounded-2xl p-4 flex flex-col items-center text-center group hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${svc.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <DynamicIcon name={svc.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{svc.title}</h3>
                <span className="text-[10px] text-slate-400 mt-0.5">{svc.category}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Service Requests / Passbook Stream */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                <HistoryIcon className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-base">Recent Transactions & Requests</h2>
            </div>
            <Link
              to="/history"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Full History</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentRequests.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CreditCard className="w-10 h-10 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-semibold">No recent transactions.</p>
              <p className="text-xs text-slate-400 mt-0.5">Pay a bill or recharge to see your requests here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentRequests.map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                      ₹
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{req.service?.title || 'Service Request'}</p>
                      <p className="text-[10px] text-slate-400">Ref: {req.refId} • {new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">₹ {req.amount}</p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : req.status === 'In Progress'
                          ? 'bg-sky-50 text-sky-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
