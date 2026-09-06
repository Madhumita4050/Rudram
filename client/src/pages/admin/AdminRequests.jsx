import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  User,
  ArrowRight,
  Filter
} from 'lucide-react';
import { getAdminRequests, updateAdminRequestStatus } from '../../api/admin';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;

      const data = await getAdminRequests(params);
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRequests();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await updateAdminRequestStatus(id, newStatus);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      setMessage({ type: 'success', text: `Transaction #${id} updated to ${newStatus}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update transaction status' });
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Failed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-amber-400" />
            <span>Service Transactions & Orders</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track user bill payments, recharge orders, travel bookings, and update processing statuses.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Reference ID (e.g. RP-12345)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
          >
            <option value="All">All Transactions</option>
            {statusOptions.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Reference ID</th>
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Amount / Mode</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mb-2"></div>
                    <p>Loading transactions...</p>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    <CreditCard className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-slate-400">No service transactions found.</p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-850/60 transition-colors">
                    {/* Ref ID */}
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {req.refId}
                      </span>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-white text-sm">{req.service?.title || 'Custom Service'}</p>
                      <p className="text-[11px] text-slate-400">{req.service?.category || 'General'}</p>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-200">{req.user?.name || 'Guest User'}</p>
                      <p className="text-[11px] text-slate-500">{req.user?.email}</p>
                    </td>

                    {/* Amount & Mode */}
                    <td className="py-4 px-6">
                      <p className="font-black text-white text-sm">₹ {req.amount}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{req.mode || 'Online'}</p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                          req.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : req.status === 'In Progress'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            : req.status === 'Failed'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Action Dropdown */}
                    <td className="py-4 px-6 text-right">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        disabled={updatingId === req.id}
                        className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer disabled:opacity-50"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} className="bg-slate-900">
                            Set: {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
