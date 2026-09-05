import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function Register() {
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
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
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      const res = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setSubmittedData(result);
      setStep(2); // Directly go to Success step
    } catch (error) {
      alert(error.message || 'Failed to submit registration. Please check server connection.');
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
            Register as a member, officer, or assistant to start your journey.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {step === 1 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</div>
                <h3 className="text-xl font-bold text-slate-800">Fill Application Form</h3>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Role <span className="text-red-500">*</span></label>
                  <select 
                    name="role" 
                    required 
                    value={formData.role} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="">-- Choose a Role --</option>
                    <option value="Founder Member">Founder Member</option>
                    <option value="Field Officer">Field Officer</option>
                    <option value="Personal Assistance">Personal Assistance (Girls & Boys Both)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Details */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Father / Husband Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fatherHusbandName" required value={formData.fatherHusbandName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Enter father or husband name" />
                  </div>
                  
                  {/* Contact Details */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="your@email.com" />
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 mt-6">Address Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Village (Vill.)</label>
                      <input type="text" name="village" required value={formData.village} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Post</label>
                      <input type="text" name="post" required value={formData.post} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Block</label>
                      <input type="text" name="block" required value={formData.block} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">District</label>
                      <input type="text" name="district" required value={formData.district} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                      <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Pin Code</label>
                      <input type="text" name="pinCode" required value={formData.pinCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Education Qualification <span className="text-red-500">*</span></label>
                    <input type="text" name="education" required value={formData.education} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. 12th Pass, Graduate, etc." />
                  </div>
                  
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">App Photo <span className="text-red-500">*</span></label>
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
                  <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
                    {loading ? 'Submitting...' : 'Submit Registration Details'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Registration Complete!</h3>
              <p className="text-slate-600 mb-2 max-w-md mx-auto">
                Thank you for registering with RudranPay. Your application details have been submitted successfully.
              </p>
              {submittedData?.registrationId && (
                <p className="text-xs font-semibold text-slate-400 mb-8">
                  Application ID: #{submittedData.registrationId}
                </p>
              )}
              <div className="flex justify-center gap-4">
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
