import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  UserCheck,
  UserX,
  Wallet,
  Plus,
  Minus,
  Edit2,
  AlertCircle,
  X,
  CheckCircle
} from 'lucide-react';
import {
  getAdminUsers,
  updateAdminUserRole,
  updateAdminUserStatus,
  updateAdminUserWallet
} from '../../api/admin';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState(null);

  // Wallet Modal State
  const [walletModalUser, setWalletModalUser] = useState(null);
  const [walletAmount, setWalletAmount] = useState('');
  const [walletAction, setWalletAction] = useState('credit');
  const [submittingWallet, setSubmittingWallet] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (roleFilter !== 'All') params.role = roleFilter;
      if (statusFilter !== 'All') params.status = statusFilter;

      const data = await getAdminUsers(params);
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, roleFilter, statusFilter]);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    try {
      await updateAdminUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      setMessage({ type: 'success', text: `User role updated to ${newRole}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update user role' });
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await updateAdminUserStatus(userId, newStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      setMessage({ type: 'success', text: `User account is now ${newStatus}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update status' });
    }
  };

  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    if (!walletAmount || isNaN(walletAmount) || parseFloat(walletAmount) <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }

    try {
      setSubmittingWallet(true);
      const res = await updateAdminUserWallet(walletModalUser.id, parseFloat(walletAmount), walletAction);
      setUsers((prev) =>
        prev.map((u) => (u.id === walletModalUser.id ? { ...u, walletBalance: res.walletBalance } : u))
      );
      setWalletModalUser(null);
      setWalletAmount('');
      setMessage({ type: 'success', text: `Wallet updated successfully!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to adjust wallet balance' });
    } finally {
      setSubmittingWallet(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-400" />
            <span>User Accounts & Permissions</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage user roles, security statuses, and platform wallet balances.
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
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
            >
              <option value="All">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Contact / Phone</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Wallet Balance</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mb-2"></div>
                    <p>Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-slate-400">No users found.</p>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-850/60 transition-colors">
                    {/* User */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400">
                          {u.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-6">
                      <p className="text-slate-200">{u.phone || 'Not Provided'}</p>
                      <p className="text-[10px] text-slate-500">ID: #USR-{u.id}</p>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border ${
                          u.role === 'admin'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {u.role === 'admin' && <Shield className="w-3.5 h-3.5 text-purple-400" />}
                        <span className="capitalize">{u.role}</span>
                      </span>
                    </td>

                    {/* Wallet Balance */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm">
                          ₹ {(u.walletBalance || 0).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => setWalletModalUser(u)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-colors"
                          title="Adjust Balance"
                        >
                          <Wallet className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                          u.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                        <span className="capitalize">{u.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Admin / User */}
                        <button
                          onClick={() => handleRoleToggle(u.id, u.role)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                            u.role === 'admin'
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                              : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                          title={u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                        >
                          {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                        </button>

                        {/* Toggle Block / Active */}
                        <button
                          onClick={() => handleStatusToggle(u.id, u.status)}
                          className={`p-2 rounded-xl border transition-colors ${
                            u.status === 'active'
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                          }`}
                          title={u.status === 'active' ? 'Block Account' : 'Unblock Account'}
                        >
                          {u.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Wallet Balance Modal */}
      {walletModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setWalletModalUser(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Adjust Wallet Balance</h3>
                <p className="text-xs text-slate-400">User: {walletModalUser.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Current Balance: <span className="font-bold text-amber-400">₹ {walletModalUser.walletBalance || 0}</span>
            </p>

            <form onSubmit={handleWalletSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Action</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWalletAction('credit')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 ${
                      walletAction === 'credit'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> Credit (Add Money)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletAction('debit')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 ${
                      walletAction === 'debit'
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" /> Debit (Deduct)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Enter amount (e.g. 500)"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submittingWallet}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md disabled:opacity-50"
                >
                  {submittingWallet ? 'Updating...' : 'Confirm Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setWalletModalUser(null)}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
