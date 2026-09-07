import React, { useState, useEffect } from 'react';
import {
  QrCode,
  IndianRupee,
  Upload,
  CheckCircle,
  AlertCircle,
  Save,
  Building2,
  Smartphone,
  Info,
  ShieldCheck,
  Eye,
  RefreshCw
} from 'lucide-react';
import { getAdminPaymentSettings, updateAdminPaymentSettings } from '../../api/admin';
import { API_BASE_URL } from '../../config/api';

export default function AdminPaymentSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    payeeName: 'RUDRANARAYAN RUDRAN',
    upiId: 'rudranarayan@upi',
    founderMemberFee: 830,
    fieldOfficerFee: 570,
    computerOperatorFee: 450,
    personalAssistantFee: 1200,
    bankName: 'State Bank of India',
    accountNumber: '',
    ifscCode: '',
    accountHolder: 'RUDRANARAYAN RUDRAN',
    isUpiActive: true,
    isBankActive: true,
    isCashActive: true,
    instructions: 'Scan the PhonePe QR code, complete your payment, and enter the 12-digit UTR / UPI Reference ID below.'
  });

  const [qrCodeImage, setQrCodeImage] = useState(null); // File object
  const [qrPreviewUrl, setQrPreviewUrl] = useState(null); // Existing URL or Blob URL

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getAdminPaymentSettings();
      if (data) {
        setFormData({
          payeeName: data.payeeName || 'RUDRANARAYAN RUDRAN',
          upiId: data.upiId || 'rudranarayan@upi',
          founderMemberFee: data.founderMemberFee ?? 830,
          fieldOfficerFee: data.fieldOfficerFee ?? 570,
          computerOperatorFee: data.computerOperatorFee ?? 450,
          personalAssistantFee: data.personalAssistantFee ?? 1200,
          bankName: data.bankName || 'State Bank of India',
          accountNumber: data.accountNumber || '',
          ifscCode: data.ifscCode || '',
          accountHolder: data.accountHolder || 'RUDRANARAYAN RUDRAN',
          isUpiActive: data.isUpiActive !== undefined ? data.isUpiActive : true,
          isBankActive: data.isBankActive !== undefined ? data.isBankActive : true,
          isCashActive: data.isCashActive !== undefined ? data.isCashActive : true,
          instructions: data.instructions || 'Scan the PhonePe QR code, complete your payment, and enter the 12-digit UTR / UPI Reference ID below.'
        });

        if (data.qrCodeImage) {
          const formattedUrl = data.qrCodeImage.startsWith('http')
            ? data.qrCodeImage
            : `${API_BASE_URL.replace('/api', '')}/${data.qrCodeImage.replace(/^\/+/, '')}`;
          setQrPreviewUrl(formattedUrl);
        } else {
          setQrPreviewUrl('/payment-qr.png');
        }
      }
    } catch (err) {
      console.error('Error loading payment settings:', err);
      setMessage({ type: 'error', text: 'Failed to load current payment settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrCodeImage(file);
      setQrPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (qrCodeImage) {
        data.append('qrCodeImage', qrCodeImage);
      }

      const result = await updateAdminPaymentSettings(data);
      setMessage({ type: 'success', text: 'Payment settings and role pricing updated successfully!' });
      
      if (result.settings && result.settings.qrCodeImage) {
        const formattedUrl = result.settings.qrCodeImage.startsWith('http')
          ? result.settings.qrCodeImage
          : `${API_BASE_URL.replace('/api', '')}/${result.settings.qrCodeImage.replace(/^\/+/, '')}`;
        setQrPreviewUrl(formattedUrl);
      }
    } catch (err) {
      console.error('Error saving payment settings:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to save payment settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-amber-600 font-semibold text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" /> Loading Payment Settings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <QrCode className="w-7 h-7 text-amber-500" />
            Payment Gateway & QR Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage dynamic role fees, PhonePe QR scanner, UPI IDs, bank details, and active payment methods.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      {/* Status Banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm animate-in fade-in duration-300 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: ROLE-BASED PRICING */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Role-Specific Registration Fees (₹)</h2>
              <p className="text-xs text-slate-500">Set the exact registration fee for each role. Changes update the public registration checkout immediately.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Founder Member */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Founder Member</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-semibold border border-amber-200">Active</span>
              </div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fee Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  name="founderMemberFee"
                  min="0"
                  step="1"
                  required
                  value={formData.founderMemberFee}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Default: ₹830</p>
            </div>

            {/* Field Officer */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Field Officer</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-semibold border border-blue-200">Active</span>
              </div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fee Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  name="fieldOfficerFee"
                  min="0"
                  step="1"
                  required
                  value={formData.fieldOfficerFee}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Default: ₹570</p>
            </div>

            {/* Computer Operator */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Computer Operator</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">Active</span>
              </div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fee Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  name="computerOperatorFee"
                  min="0"
                  step="1"
                  required
                  value={formData.computerOperatorFee}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Default: ₹450</p>
            </div>

            {/* Personal Assistant */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-purple-400 transition-all rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Personal Assistant</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md font-semibold border border-purple-200">Active</span>
              </div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fee Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  name="personalAssistantFee"
                  min="0"
                  step="1"
                  required
                  value={formData.personalAssistantFee}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Default: ₹1200</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: QR SCANNER & UPI DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: QR Code Preview & Upload */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">QR Code Scanner Image</h2>
                  <p className="text-xs text-slate-500">PhonePe / UPI payment QR code displayed to applicants</p>
                </div>
              </div>

              {/* QR Image Display */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
                <div className="w-56 h-72 max-w-full bg-white rounded-xl overflow-hidden p-2 flex items-center justify-center shadow-sm border border-slate-200">
                  {qrPreviewUrl ? (
                    <img
                      src={qrPreviewUrl}
                      alt="Payment QR Scanner"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/payment-qr.png';
                      }}
                    />
                  ) : (
                    <QrCode className="w-24 h-24 text-slate-300" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-slate-900 uppercase">{formData.payeeName}</p>
                  <p className="text-[11px] text-amber-600 font-mono mt-0.5">{formData.upiId}</p>
                </div>
              </div>
            </div>

            {/* Upload New QR Button */}
            <div>
              <label className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-amber-400 rounded-xl text-xs font-bold text-slate-800 cursor-pointer transition-all">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>Upload / Change QR Scanner Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-400 text-center mt-2">Supports JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          </div>

          {/* Right: UPI & Payee Settings */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">UPI & Payee Information</h2>
                <p className="text-xs text-slate-500">Account recipient name and payment instructions shown at checkout</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payee / Account Holder Name</label>
                <input
                  type="text"
                  name="payeeName"
                  required
                  value={formData.payeeName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. RUDRANARAYAN RUDRAN"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">UPI ID (VPA)</label>
                <input
                  type="text"
                  name="upiId"
                  required
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. rudranarayan@upi or 9506944887@ybl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Applicant Payment Instructions</label>
                <textarea
                  name="instructions"
                  rows="3"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Instructions shown to applicant on payment scan step..."
                />
              </div>
            </div>

            {/* Payment Method Toggles */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Allowed Payment Modes</h3>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-amber-400">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">PhonePe / UPI QR Scanner</p>
                      <p className="text-[10px] text-slate-500">Allow instant payment using QR code scanning</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="isUpiActive"
                    checked={formData.isUpiActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Direct Bank IMPS/NEFT</p>
                      <p className="text-[10px] text-slate-500">Allow direct bank account deposit</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="isBankActive"
                    checked={formData.isBankActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-400">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Cash / In-Person Payment</p>
                      <p className="text-[10px] text-slate-500">Allow submitting form for counter cash verification</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="isCashActive"
                    checked={formData.isCashActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: BANK ACCOUNT DETAILS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Bank Account Details (Optional)</h2>
              <p className="text-xs text-slate-500">Shown to users if they choose direct IMPS / NEFT payment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. State Bank of India"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Account Holder Name</label>
              <input
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. RUDRANARAYAN RUDRAN"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Account number"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. SBIN0001234"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Saving All Settings...' : 'Save & Publish Payment Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
