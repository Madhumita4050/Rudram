import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  CheckCircle,
  QrCode,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Upload,
  Printer
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import defaultQrImage from '../assets/payment-qr.png';

export default function Register() {
  const [step, setStep] = useState(1); // 1: Form, 2: Payment Scanner, 3: Success
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Dynamic Payment Settings from Admin/Backend
  const [paymentSettings, setPaymentSettings] = useState({
    payeeName: 'RUDRANARAYAN RUDRAN',
    upiId: 'rudranarayan@upi',
    qrCodeImage: defaultQrImage,
    founderMemberFee: 830,
    fieldOfficerFee: 570,
    computerOperatorFee: 450,
    personalAssistantFee: 1200,
    instructions: 'Scan the PhonePe QR code, complete your payment, and enter the 12-digit UTR / UPI Reference ID below.'
  });

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    fatherHusbandName: '',
    village: '',
    post: '',
    block: '',
    district: '',
    state: '',
    pinCode: '',
    contactNumber: '',
    email: '',
    education: '',
    photo: null,
    paymentMode: 'PhonePe / UPI QR',
    transactionId: '',
    paymentProof: null
  });

  // Fetch active payment settings and role fees from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/registrations/payment-settings`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            let qrUrl = defaultQrImage;
            if (data.qrCodeImage) {
              qrUrl = data.qrCodeImage.startsWith('http')
                ? data.qrCodeImage
                : `${API_BASE_URL.replace('/api', '')}/${data.qrCodeImage.replace(/^\/+/, '')}`;
            }
            setPaymentSettings({
              payeeName: data.payeeName || 'RUDRANARAYAN RUDRAN',
              upiId: data.upiId || 'rudranarayan@upi',
              qrCodeImage: qrUrl,
              founderMemberFee: data.founderMemberFee ?? 830,
              fieldOfficerFee: data.fieldOfficerFee ?? 570,
              computerOperatorFee: data.computerOperatorFee ?? 450,
              personalAssistantFee: data.personalAssistantFee ?? 1200,
              instructions: data.instructions || 'Scan the PhonePe QR code, complete your payment, and enter the 12-digit UTR / UPI Reference ID below.'
            });
          }
        }
      } catch (err) {
        console.warn('Using default payment settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const getSelectedFee = () => {
    if (formData.role === 'Founder Member') return paymentSettings.founderMemberFee || 830;
    if (formData.role === 'Field Officer') return paymentSettings.fieldOfficerFee || 570;
    if (formData.role === 'Computer Operator') return paymentSettings.computerOperatorFee || 450;
    if (formData.role === 'Personal Assistant' || formData.role === 'Personal Assistance') return paymentSettings.personalAssistantFee || 1200;
    return 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(paymentSettings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert('Please select a role.');
      return;
    }
    if (!formData.photo) {
      alert('Please upload your photo.');
      return;
    }
    setStep(2); // Go to Payment Step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!formData.transactionId) {
      alert('Please enter your 12-digit UTR / UPI Reference ID.');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });
      data.append('feeAmount', getSelectedFee());

      let res;
      try {
        res = await fetch(`${API_BASE_URL}/registrations`, {
          method: 'POST',
          body: data,
        });
      } catch (networkErr) {
        console.error('Registration fetch network error:', networkErr);
        throw new Error('Server se connect nahi ho pa raha, kripya thodi der baad try karein.');
      }

      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setSubmittedData(result);
      setStep(3); // Go to Success Step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        alert('Server se connect nahi ho pa raha, kripya thodi der baad try karein.');
      } else {
        alert(error.message || 'Failed to submit registration. Please check server connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Join RudranPay
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Register as a member, officer, operator, or assistant to start your journey.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* ================= STEP 1: FORM ================= */}
          {step === 1 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Fill Application Form</h3>
                  <p className="text-xs text-slate-500">Enter your details and select your position</p>
                </div>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Select Role <span className="text-red-500">*</span>
                    </label>
                    {formData.role && (
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        Registration Fee: ₹{getSelectedFee()}.00
                      </span>
                    )}
                  </div>
                  <select 
                    name="role" 
                    required 
                    value={formData.role} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-medium"
                  >
                    <option value="">-- Choose a Role --</option>
                    <option value="Founder Member">Founder Member (संस्थापक सदस्य) - ₹{paymentSettings.founderMemberFee || 830}</option>
                    <option value="Field Officer">Field Officer (फील्ड ऑफिसर) - ₹{paymentSettings.fieldOfficerFee || 570}</option>
                    <option value="Computer Operator">Computer Operator (कंप्यूटर ऑपरेटर) - ₹{paymentSettings.computerOperatorFee || 450}</option>
                    <option value="Personal Assistant">Personal Assistant (पर्सनल असिस्टेंट) - ₹{paymentSettings.personalAssistantFee || 1200}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Details */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Father / Husband Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fatherHusbandName" required value={formData.fatherHusbandName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" placeholder="Enter father or husband name" />
                  </div>
                  
                  {/* Contact Details */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="contactNumber" required maxLength="10" value={formData.contactNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" placeholder="your@email.com" />
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 mt-6">Address Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Village (Vill.)</label>
                      <input type="text" name="village" required value={formData.village} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Post</label>
                      <input type="text" name="post" required value={formData.post} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Block</label>
                      <input type="text" name="block" required value={formData.block} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">District</label>
                      <input type="text" name="district" required value={formData.district} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                      <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Pin Code</label>
                      <input type="text" name="pinCode" required maxLength="6" value={formData.pinCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Education Qualification <span className="text-red-500">*</span></label>
                    <input type="text" name="education" required value={formData.education} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-800" placeholder="e.g. 10th / 12th Pass, Graduate, etc." />
                  </div>
                  
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Applicant Photo <span className="text-red-500">*</span></label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-6 h-6 mb-2 text-slate-500" />
                          <p className="text-xs text-slate-500">{formData.photo ? formData.photo.name : "Click to upload your photo"}</p>
                        </div>
                        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="hidden" required />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-base"
                  >
                    <span>Proceed to Payment (Scan QR)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= STEP 2: PHONEPE QR SCANNER & PAYMENT ================= */}
          {step === 2 && (
            <div className="p-8 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Scan & Pay Registration Fee</h3>
                  <p className="text-xs text-slate-500">Scan the PhonePe QR code to complete your payment</p>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500">Applicant Name</span>
                  <p className="font-bold text-slate-900 text-base">{formData.name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">Role: <strong className="text-slate-800">{formData.role}</strong></p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-semibold text-slate-500">Applicable Fee</span>
                  <p className="text-2xl font-black text-amber-600">₹{getSelectedFee()}.00</p>
                </div>
              </div>

              {/* QR Scanner & Instructions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                {/* QR Scanner Image */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-56 max-w-full bg-white rounded-2xl p-3 shadow-md border border-slate-200 flex items-center justify-center">
                    <img
                      src={paymentSettings.qrCodeImage || defaultQrImage}
                      alt="PhonePe Payment QR"
                      className="w-full h-auto object-contain rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultQrImage;
                      }}
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2 uppercase tracking-wide">{paymentSettings.payeeName}</p>
                </div>

                {/* Payment Instructions & UTR input */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-500" />
                      Scan & Pay using PhonePe / GPay / Paytm
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {paymentSettings.instructions}
                    </p>
                  </div>

                  {/* UPI Copy Box */}
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">UPI ID</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{paymentSettings.upiId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-lg transition-colors"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedUpi ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      12-Digit UPI Reference Number / UTR <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      required
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder="e.g. 4235XXXXXXXX or 12-digit UTR"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  {/* Payment Screenshot (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Payment Screenshot / Receipt (Optional)
                    </label>
                    <label className="flex items-center gap-2 p-2.5 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span className="text-xs text-slate-600 truncate">
                        {formData.paymentProof ? formData.paymentProof.name : 'Upload receipt screenshot'}
                      </span>
                      <input
                        type="file"
                        name="paymentProof"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit Form
                </button>

                <button
                  type="button"
                  onClick={handlePaymentSubmit}
                  disabled={loading}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application & Payment'}
                  {!loading && <CheckCircle className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SUCCESS ================= */}
          {step === 3 && (
            <div className="p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Registration Complete!</h3>
              <p className="text-slate-600 mb-2 max-w-md mx-auto">
                Thank you for registering with RudranPay. Your application and payment details have been submitted successfully.
              </p>
              
              {submittedData?.registrationId && (
                <p className="text-xs font-semibold text-slate-400 mb-6">
                  Application ID: #{submittedData.registrationId}
                </p>
              )}

              {/* Summary Card */}
              <div className="max-w-sm mx-auto p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs text-slate-600 space-y-2 mb-8">
                <div className="flex justify-between">
                  <span>Applicant:</span>
                  <strong className="text-slate-900">{formData.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Applied Role:</span>
                  <strong className="text-amber-600">{formData.role}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fee Paid:</span>
                  <strong className="text-slate-900">₹{getSelectedFee()}.00</strong>
                </div>
                {formData.transactionId && (
                  <div className="flex justify-between">
                    <span>UTR / Ref ID:</span>
                    <span className="font-mono font-bold text-slate-800">{formData.transactionId}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-6 py-3.5 border border-slate-200 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print Slip
                </button>
                <Link to="/" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-colors">
                  Return to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
