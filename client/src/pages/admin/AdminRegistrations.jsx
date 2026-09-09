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
  AlertCircle,
  QrCode,
  IndianRupee,
  ExternalLink,
  Image as ImageIcon
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
      await updateAdminRegistrationStatus(id, { paymentStatus: newStatus });
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

  // Get photo/proof full URL
  const getAssetUrl = (assetPath) => {
    if (!assetPath || assetPath === '0' || assetPath === 'null' || assetPath === 'undefined' || typeof assetPath !== 'string') return null;
    if (assetPath.trim() === '') return null;
    if (assetPath.startsWith('http')) return assetPath;
    const cleanPath = assetPath.replace(/\\/g, '/').replace(/^\/+/, '');
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}/${cleanPath}`;
  };

  // Helper for role fee default if missing in DB
  const getFeeForRole = (role, storedFee) => {
    if (storedFee && storedFee > 0) return storedFee;
    if (role === 'Founder Member') return 830;
    if (role === 'Field Officer') return 570;
    if (role === 'Computer Operator') return 450;
    if (role === 'Personal Assistant' || role === 'Personal Assistance') return 1200;
    return 0;
  };

  const rolesList = [
    'All',
    'Founder Member',
    'Field Officer',
    'Computer Operator',
    'Personal Assistant',
    'Personal Assistance'
  ];
  const statusList = ['All', 'Completed', 'Pending', 'Rejected', 'Failed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-amber-500" />
            <span>Citizen & Officer Registrations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, verify UTR payments, approve, and download registration applications across all categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-500" />
            <span>Print List</span>
          </button>
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-semibold animate-in fade-in duration-300 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Filter by Role */}
        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
          >
            {rolesList.map((r) => (
              <option key={r} value={r}>
                Role: {r}
              </option>
            ))}
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Filter by Status */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
          >
            {statusList.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Applicant</th>
                <th className="py-4 px-6">Role & Fee</th>
                <th className="py-4 px-6">Payment / UTR</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mb-2"></div>
                    <p>Loading registrations...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <FileCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No registrations found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => {
                  const fee = getFeeForRole(reg.role, reg.feeAmount);
                  return (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                      {/* Applicant */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 text-amber-600 font-bold">
                            {reg.photo ? (
                              <img
                                src={getAssetUrl(reg.photo)}
                                alt={reg.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <User className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{reg.name}</p>
                            <p className="text-[11px] text-slate-500">{reg.contactNumber}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role & Fee */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[11px] font-semibold">
                            {reg.role}
                          </span>
                          <p className="text-[11px] font-bold text-slate-900">₹{fee}.00</p>
                        </div>
                      </td>

                      {/* Payment Mode & UTR */}
                      <td className="py-4 px-6">
                        <p className="text-slate-800 font-medium text-[11px]">{reg.paymentMode || 'PhonePe / UPI QR'}</p>
                        {reg.transactionId ? (
                          <p className="text-[10px] font-mono text-emerald-600 font-semibold">UTR: {reg.transactionId}</p>
                        ) : (
                          <p className="text-[10px] text-slate-400">UTR: Not provided</p>
                        )}
                        {reg.paymentProof && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 hover:underline cursor-pointer" onClick={() => setSelectedApplicant(reg)}>
                            <ImageIcon className="w-3 h-3" /> View Proof
                          </span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6">
                        <p className="text-slate-800 font-medium">{reg.district || 'N/A'}, {reg.state || ''}</p>
                        <p className="text-[11px] text-slate-500">PIN: {reg.pinCode || 'N/A'}</p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                            reg.paymentStatus === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : reg.paymentStatus === 'Rejected' || reg.paymentStatus === 'Failed'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {reg.paymentStatus === 'Completed' ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : reg.paymentStatus === 'Rejected' || reg.paymentStatus === 'Failed' ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>{reg.paymentStatus}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApplicant(reg)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="View Full Profile & Proof"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {reg.paymentStatus !== 'Completed' && (
                            <button
                              onClick={() => handleStatusChange(reg.id, 'Completed')}
                              disabled={updatingId === reg.id}
                              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                              title="Approve & Mark Paid"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(reg.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPLICANT DETAIL & PAYMENT PROOF MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold text-lg">
                  #{selectedApplicant.id}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedApplicant.name}</h3>
                  <p className="text-xs text-slate-500">Role: <span className="text-amber-600 font-semibold">{selectedApplicant.role}</span></p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Profile Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Photo */}
              <div className="sm:col-span-4 flex flex-col items-center">
                <div className="w-32 h-40 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm relative">
                  {getAssetUrl(selectedApplicant.photo) ? (
                    <img
                      src={getAssetUrl(selectedApplicant.photo)}
                      alt={selectedApplicant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center bg-slate-100"
                    style={{ display: getAssetUrl(selectedApplicant.photo) ? 'none' : 'flex' }}
                  >
                    <User className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 font-medium">Passport Photo</span>
              </div>

              {/* Personal Details */}
              <div className="sm:col-span-8 space-y-2.5 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Father / Husband Name</span>
                  <p className="font-semibold text-slate-900">{selectedApplicant.fatherHusbandName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                    <p className="font-semibold text-slate-900">{selectedApplicant.contactNumber}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <p className="font-semibold text-slate-900">{selectedApplicant.email}</p>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Education Qualification</span>
                  <p className="font-semibold text-slate-900">{selectedApplicant.education}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Permanent Address</span>
                  <p className="text-slate-800">
                    {selectedApplicant.village ? `Vill: ${selectedApplicant.village}, ` : ''}
                    {selectedApplicant.post ? `Post: ${selectedApplicant.post}, ` : ''}
                    {selectedApplicant.block ? `Block: ${selectedApplicant.block}, ` : ''}
                    {selectedApplicant.district}, {selectedApplicant.state} - {selectedApplicant.pinCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment & Verification Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" /> Payment & Transaction Verification
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    selectedApplicant.paymentStatus === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : selectedApplicant.paymentStatus === 'Rejected'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {selectedApplicant.paymentStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Payable Fee:</span>
                  <p className="font-extrabold text-amber-600 text-sm">
                    ₹{getFeeForRole(selectedApplicant.role, selectedApplicant.feeAmount)}.00
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Payment Mode:</span>
                  <p className="font-semibold text-slate-900">{selectedApplicant.paymentMode || 'PhonePe / UPI QR'}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">UTR / Reference Number:</span>
                  <p className="font-mono font-bold text-emerald-600">
                    {selectedApplicant.transactionId || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Payment Proof Receipt Image if uploaded */}
              {getAssetUrl(selectedApplicant.paymentProof) ? (
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Uploaded Payment Screenshot</span>
                  <a
                    href={getAssetUrl(selectedApplicant.paymentProof)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block relative group rounded-xl overflow-hidden border border-slate-200 hover:border-amber-500 transition-all max-w-xs shadow-sm bg-white"
                  >
                    <img
                      src={getAssetUrl(selectedApplicant.paymentProof)}
                      alt="Payment Proof"
                      className="w-full max-h-48 object-contain rounded-xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-xs text-white font-bold transition-opacity">
                      <ExternalLink className="w-4 h-4" /> Click to view full image
                    </div>
                  </a>
                </div>
              ) : (
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Screenshot</span>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    No screenshot uploaded (Verified via UTR / UPI Reference ID).
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApplicant.id, 'Completed')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Approve Application (Mark Paid)
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApplicant.id, 'Pending')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Mark Pending
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApplicant.id, 'Rejected')}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Reject
                </button>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
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
