import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  Users,
  CreditCard,
  IndianRupee,
  Layers,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { getAdminStats } from '../../api/admin';

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const data = await getAdminStats();
      setStatsData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError('Failed to load dashboard metrics. Please check server connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = statsData?.stats || {
    totalUsers: 0,
    totalRegistrations: 0,
    completedRegistrations: 0,
    pendingRegistrations: 0,
    totalRequests: 0,
    completedRequests: 0,
    totalServices: 0,
    pendingMessages: 0,
    totalRevenue: 0
  };

  const recentRegistrations = statsData?.recentRegistrations || [];
  const recentRequests = statsData?.recentRequests || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 shadow-xl text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Rudran Administrator Control
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Real-time monitoring of all citizen registrations, digital service transactions, QR payment settings, and support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Refresh Stats'}</span>
            </button>
            <Link
              to="/admin/registrations"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Review Applications</span>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-amber-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹ {stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{stats.completedRegistrations} paid applications</span>
            </p>
          </div>
        </div>

        {/* Total Registrations */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-sky-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registrations</span>
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-200 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {stats.totalRegistrations}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-emerald-600 font-bold">{stats.completedRegistrations} Paid</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-600 font-bold">{stats.pendingRegistrations} Pending</span>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-purple-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Users</span>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-200 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Full platform accounts</span>
            </p>
          </div>
        </div>

        {/* Service Requests */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-emerald-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Requests</span>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {stats.totalRequests}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">{stats.completedRequests} Completed</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{stats.totalServices} Services</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Link
          to="/admin/registrations"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-amber-400 rounded-2xl flex items-center gap-3 transition-all shadow-sm"
        >
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Registrations</p>
            <p className="text-[11px] text-slate-500">Review & verify</p>
          </div>
        </Link>

        <Link
          to="/admin/payment-settings"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-amber-400 rounded-2xl flex items-center gap-3 transition-all shadow-sm"
        >
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">QR & Pricing</p>
            <p className="text-[11px] text-slate-500">Fees & scanner</p>
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-purple-400 rounded-2xl flex items-center gap-3 transition-all shadow-sm"
        >
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">User Accounts</p>
            <p className="text-[11px] text-slate-500">Roles & wallets</p>
          </div>
        </Link>

        <Link
          to="/admin/requests"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-sky-400 rounded-2xl flex items-center gap-3 transition-all shadow-sm"
        >
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Transactions</p>
            <p className="text-[11px] text-slate-500">Update requests</p>
          </div>
        </Link>

        <Link
          to="/admin/services"
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-400 rounded-2xl flex items-center gap-3 transition-all shadow-sm"
        >
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Catalog</p>
            <p className="text-[11px] text-slate-500">Manage services</p>
          </div>
        </Link>
      </div>

      {/* Two Column Section: Recent Registrations & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <FileCheck className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-900 text-base">Recent Citizen Applications</h2>
            </div>
            <Link
              to="/admin/registrations"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {recentRegistrations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No recent registrations.
              </div>
            ) : (
              recentRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-3.5 bg-slate-50 hover:bg-amber-50/40 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      #{reg.id}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{reg.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{reg.role} • {reg.district || 'Location'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        reg.paymentStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {reg.paymentStatus}
                    </span>
                    <Link
                      to="/admin/registrations"
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Service Transactions */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-900 text-base">Recent Service Requests</h2>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {recentRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No recent service requests.
              </div>
            ) : (
              recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 bg-slate-50 hover:bg-sky-50/40 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ₹{req.amount}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{req.service?.title || 'Service'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{req.user?.name || 'User'} • {req.user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        req.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {req.status}
                    </span>
                    <Link
                      to="/admin/requests"
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
