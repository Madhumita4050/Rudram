import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Printer,
  X,
  User,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  CreditCard,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  getAdminRegistrations,
  updateAdminRegistrationStatus,
  deleteAdminRegistration
} from '../../api/admin';
import { API_BASE_URL } from '../../config/api';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedRole !== 'All') params.role = selectedRole;
      if (selectedStatus !== 'All') params.paymentStatus = selectedStatus;

      const data = await getAdminRegistrations(params);
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRegistrations();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, selectedRole, selectedStatus]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await updateAdminRegistrationStatus(id, newStatus);
      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === id ? { ...reg, paymentStatus: newStatus } : reg))
      );
      if (selectedApplicant && selectedApplicant.id === id) {
        setSelectedApplicant((prev) => ({ ...prev, paymentStatus: newStatus }));
      }
      setMessage({ type: 'success', text: `Status successfully updated to ${newStatus}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update payment status' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this registration?')) return;
    try {
      await deleteAdminRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      if (selectedApplicant && selectedApplicant.id === id) {
        setSelectedApplicant(null);
      }
      setMessage({ type: 'success', text: 'Registration record removed' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete record' });
    }
  };

  // Get photo full URL
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http')) return photoPath;
    const cleanPath = photoPath.replace(/\\/g, '/');
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}/${cleanPath}`;
  };

  const rolesList = ['All', 'Founder Member', 'Personal Assistance', 'Field Officer'];
  const statusList = ['All', 'Completed', 'Pending', 'Failed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-amber-400" />
            <span>Citizen & Officer Registrations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage, verify, approve, and download registration applications across all categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print List</span>
          </button>
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

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone, district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
            >
              {rolesList.map((r) => (
                <option key={r} value={r} className="bg-slate-900">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
            >
              {statusList.map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Applicant</th>
                <th className="py-4 px-6">Role / Designation</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Fee Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mb-2"></div>
                    <p>Loading registrations...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <FileCheck className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-slate-400">No registrations found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-850/60 transition-colors group">
                    {/* Applicant */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 text-amber-400 font-bold">
                          {reg.photo ? (
                            <img
                              src={getPhotoUrl(reg.photo)}
                              alt={reg.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <User className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{reg.name}</p>
                          <p className="text-[11px] text-slate-400">S/O, D/O: {reg.fatherHusbandName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-semibold">
                        {reg.role}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6">
                      <p className="text-slate-200 font-medium">{reg.district || 'N/A'}, {reg.state || ''}</p>
                      <p className="text-[11px] text-slate-500">PIN: {reg.pinCode || 'N/A'}</p>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6">
                      <p className="text-slate-200 font-medium">{reg.contactNumber}</p>
                      <p className="text-[11px] text-slate-500">{reg.email}</p>
                    </td>

                    {/* Fee Status */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                            reg.paymentStatus === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : reg.paymentStatus === 'Failed'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {reg.paymentStatus === 'Completed' ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : reg.paymentStatus === 'Failed' ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>{reg.paymentStatus}</span>
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApplicant(reg)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Full Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {reg.paymentStatus !== 'Completed' && (
                          <button
                            onClick={() => handleStatusChange(reg.id, 'Completed')}
                            disabled={updatingId === reg.id}
                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Mark as Paid/Approved"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Detailed Applicant Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-amber-500/40 overflow-hidden flex items-center justify-center text-amber-400 font-bold text-xl flex-shrink-0">
                {selectedApplicant.photo ? (
                  <img
                    src={getPhotoUrl(selectedApplicant.photo)}
                    alt={selectedApplicant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-slate-500" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">
                  {selectedApplicant.role}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{selectedApplicant.name}</h2>
                <p className="text-xs text-slate-400">Application ID: #REG-00{selectedApplicant.id}</p>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="py-6 space-y-5 text-xs">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Father / Husband Name</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedApplicant.fatherHusbandName || 'N/A'}</p>
                </div>
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Education Qualification</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedApplicant.education || 'N/A'}</p>
                </div>
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Number</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedApplicant.contactNumber}</p>
                </div>
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedApplicant.email}</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Residential Address</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500">Village:</span>
                    <p className="font-semibold text-white">{selectedApplicant.village || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Post:</span>
                    <p className="font-semibold text-white">{selectedApplicant.post || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Block:</span>
                    <p className="font-semibold text-white">{selectedApplicant.block || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">District:</span>
                    <p className="font-semibold text-white">{selectedApplicant.district || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">State:</span>
                    <p className="font-semibold text-white">{selectedApplicant.state || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">PIN Code:</span>
                    <p className="font-semibold text-white">{selectedApplicant.pinCode || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Payment & Gateway Verification */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Metadata</span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      selectedApplicant.paymentStatus === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {selectedApplicant.paymentStatus}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <p><span className="text-slate-500 font-semibold">Payment Amount:</span> ₹499.00 (Standard Verification Fee)</p>
                  <p><span className="text-slate-500 font-semibold">Razorpay Order ID:</span> {selectedApplicant.razorpay_order_id || 'N/A (Cash / Portal)'}</p>
                  <p><span className="text-slate-500 font-semibold">Razorpay Payment ID:</span> {selectedApplicant.razorpay_payment_id || 'N/A'}</p>
                  <p><span className="text-slate-500 font-semibold">Application Date:</span> {new Date(selectedApplicant.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApplicant.id, 'Completed')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Mark Approved & Paid
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApplicant.id, 'Pending')}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Mark Pending
                </button>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
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
