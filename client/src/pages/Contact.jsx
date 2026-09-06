import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { submitContactMessage } from '../api/user';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', subject: 'General Support' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: 'Contact',
        subject: formData.subject || 'Support Ticket',
        message: formData.message
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', subject: 'General Support' });
    } catch (err) {
      alert('Error submitting message. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Contact Support</h1>
          <p className="text-sm text-slate-500 mt-2">Have questions about a recharge or transfer? Reach out to our team.</p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Thank you for contacting RudranPay support. Our ticket team will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 mb-2">Send Support Request</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="johndoe@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 99999 88888"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Support Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Provide details about your transaction, reference ID, or service issue..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4 w-4" /> Send Ticket
                </button>
              </form>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Contact Information</h3>
                <p className="text-xs text-slate-400 mt-1">Get in touch directly via telephone or email support.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Helpline Phone</p>
                    <p className="text-sm font-semibold mt-0.5">+91 1800 123 4567</p>
                    <p className="text-[10px] text-slate-500">Toll Free, all India coverage</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Email Address</p>
                    <p className="text-sm font-semibold mt-0.5">support@rudranpay.com</p>
                    <p className="text-[10px] text-slate-500">Typical response time: 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Working Hours</p>
                    <p className="text-sm font-semibold mt-0.5">09:00 AM to 08:00 PM</p>
                    <p className="text-[10px] text-slate-500">Monday to Saturday</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 mt-8 text-[11px] text-slate-400 leading-relaxed">
              Our regional agent coordinators are ready to visit physical kiosks for any offline certificate KYC verification assistance.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
