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
  ChevronRight
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Rudran Administrator Control
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Real-time monitoring of all registrations, citizen applications, digital service transactions, and customer support.
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
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Review Applications</span>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-slate-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹ {stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{stats.completedRegistrations} paid applications</span>
            </p>
          </div>
        </div>

        {/* Total Registrations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-slate-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registrations</span>
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.totalRegistrations}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-emerald-400 font-semibold">{stats.completedRegistrations} Paid</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-semibold">{stats.pendingRegistrations} Pending</span>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-slate-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Users</span>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Full platform accounts</span>
            </p>
          </div>
        </div>

        {/* Service Requests */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg hover:border-slate-700 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Requests</span>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.totalRequests}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-400 font-semibold">{stats.completedRequests} Completed</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{stats.totalServices} Services</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/admin/registrations"
          className="p-4 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3 transition-all"
        >
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Registrations</p>
            <p className="text-[11px] text-slate-400">Review & verify</p>
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="p-4 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3 transition-all"
        >
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">User Accounts</p>
            <p className="text-[11px] text-slate-400">Roles & wallets</p>
          </div>
        </Link>

        <Link
          to="/admin/requests"
          className="p-4 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3 transition-all"
        >
          <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Transactions</p>
            <p className="text-[11px] text-slate-400">Update requests</p>
          </div>
        </Link>

        <Link
          to="/admin/services"
          className="p-4 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3 transition-all"
        >
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Catalog</p>
            <p className="text-[11px] text-slate-400">Manage services</p>
          </div>
        </Link>
      </div>

      {/* Two Column Section: Recent Registrations & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <FileCheck className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-white text-base">Recent Citizen Applications</h2>
            </div>
            <Link
              to="/admin/registrations"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-slate-800/50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : recentRegistrations.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <FileCheck className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">No registration applications yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80 flex-1">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {reg.name?.charAt(0) || 'R'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{reg.name}</p>
                      <p className="text-xs text-slate-400 truncate">
                        {reg.role} • {reg.district || 'N/A'}, {reg.state || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        reg.paymentStatus === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {reg.paymentStatus}
                    </span>
                    <Link
                      to="/admin/registrations"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Service Transactions */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-white text-base">Recent Service Requests</h2>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-slate-800/50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : recentRequests.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <CreditCard className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">No service requests submitted yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80 flex-1">
              {recentRequests.map((req) => (
                <div key={req.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ₹
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {req.service?.title || 'Service Request'}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        Ref: {req.refId} • {req.user?.name || 'Customer'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">₹ {req.amount}</p>
                      <span
                        className={`text-[10px] font-bold ${
                          req.status === 'Completed'
                            ? 'text-emerald-400'
                            : req.status === 'In Progress'
                            ? 'text-sky-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
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
