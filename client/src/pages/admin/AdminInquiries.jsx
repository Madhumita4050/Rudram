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
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-amber-400" />
            <span>Customer Inquiries & Grievances</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review user feedback, grievance submissions, and resolve citizen support tickets.
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

      {/* Filter Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Category:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
          >
            <option value="All">All Types</option>
            <option value="Contact">Contact Inquiry</option>
            <option value="Grievance">Grievance Ticket</option>
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
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-900/80 rounded-3xl animate-pulse border border-slate-800"></div>
          ))
        ) : inquiries.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center text-slate-500">
            <MessageCircle className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="font-semibold text-slate-400 text-sm">No inquiries or grievances found.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {inq.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">{inq.name}</h3>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-800 text-amber-400 rounded border border-slate-700">
                        {inq.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> {inq.email}</span>
                      {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> {inq.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                      inq.status === 'Resolved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : inq.status === 'In Progress'
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {inq.status}
                  </span>

                  <button
                    onClick={() => handleOpenReplyModal(inq)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    Respond / Resolve
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="pt-4 text-xs">
                {inq.subject && (
                  <p className="font-bold text-slate-200 mb-1">Subject: {inq.subject}</p>
                )}
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-850">
                  {inq.message}
                </p>

                {inq.adminReply && (
                  <div className="mt-3 p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Admin Response Note:</p>
                    <p className="text-slate-300">{inq.adminReply}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Response Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Respond to Inquiry</h3>
                <p className="text-xs text-slate-400">Applicant: {selectedInquiry.name} ({selectedInquiry.email})</p>
              </div>
            </div>

            <form onSubmit={handleReplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Update Status</label>
                <select
                  value={updatingStatus}
                  onChange={(e) => setUpdatingStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Pending" className="bg-slate-900">Pending</option>
                  <option value="In Progress" className="bg-slate-900">In Progress</option>
                  <option value="Resolved" className="bg-slate-900">Resolved / Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Internal Resolution Notes / Reply</label>
                <textarea
                  rows="4"
                  placeholder="Enter remarks or resolution details..."
                  value={adminReply}
                  onChange={(e) => setAdminReply(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Save Resolution'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
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
