import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  Send,
  X,
  MessageCircle
} from 'lucide-react';
import { getAdminInquiries, updateAdminInquiryStatus } from '../../api/admin';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState(null);

  // Reply Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState('Resolved');
  const [submitting, setSubmitting] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (typeFilter !== 'All') params.type = typeFilter;
      if (statusFilter !== 'All') params.status = statusFilter;

      const data = await getAdminInquiries(params);
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [typeFilter, statusFilter]);

  const handleOpenReplyModal = (inq) => {
    setSelectedInquiry(inq);
    setAdminReply(inq.adminReply || '');
    setUpdatingStatus(inq.status === 'Pending' ? 'Resolved' : inq.status);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await updateAdminInquiryStatus(selectedInquiry.id, updatingStatus, adminReply);
      setInquiries((prev) =>
        prev.map((i) => (i.id === selectedInquiry.id ? res.data : i))
      );
      setSelectedInquiry(null);
      setMessage({ type: 'success', text: 'Inquiry response updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update response' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-amber-500" />
            <span>Customer Inquiries & Support</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review user feedback and resolve citizen support tickets.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Message Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-auto cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="General">General Inquiry</option>
            <option value="Support">Support Ticket</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-auto cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Cards Stream */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mb-2"></div>
          <p className="text-xs text-slate-400">Loading messages...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl">
          <MessageSquare className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-bold text-slate-700 text-sm">No inquiries matching filter</p>
          <p className="text-xs text-slate-400 mt-1">Check back later for incoming citizen support queries.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-slate-200 hover:border-amber-400/80 rounded-3xl p-6 shadow-sm transition-all flex flex-col md:flex-row items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {inq.type || 'General Inquiry'}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      inq.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : inq.status === 'Closed'
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {inq.status === 'Resolved' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{inq.status}</span>
                  </span>

                  <span className="text-xs text-slate-400">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <User className="w-4 h-4 text-amber-500" /> {inq.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {inq.email}
                  </span>
                  {inq.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {inq.phone}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                  "{inq.message}"
                </p>

                {inq.adminReply && (
                  <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl text-xs">
                    <p className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] mb-1">Administrator Reply:</p>
                    <p className="text-slate-800">{inq.adminReply}</p>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleOpenReplyModal(inq)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-amber-500" />
                  <span>{inq.adminReply ? 'Update Reply' : 'Reply / Resolve'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REPLY MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Inquiry Response</h3>
                  <p className="text-xs text-slate-500">From: <span className="font-bold text-slate-800">{selectedInquiry.name}</span></p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">User Message</label>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  "{selectedInquiry.message}"
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={updatingStatus}
                  onChange={(e) => setUpdatingStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Response / Resolution Note</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter reply or internal resolution notes..."
                  value={adminReply}
                  onChange={(e) => setAdminReply(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Saving...' : 'Submit Resolution'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
