import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ShieldCheck, DollarSign, Smartphone, Lock } from 'lucide-react';
import { getServiceById } from '../api/services';
import { addHistoryRequest } from '../api/history';
import DynamicIcon from '../components/DynamicIcon';

export default function ServiceDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [step, setStep] = useState(1); // Step 1: Form Fill, Step 2: Payment Mode Choice
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getServiceById(id).then((data) => {
      if (data) {
        setService(data);
        // Prefill form if values came from QuickPayWidget
        const prefilled = location.state?.prefilledValues || {};
        const initialForm = {};
        data.fields.forEach(f => {
          initialForm[f.name] = prefilled[f.name] || '';
        });
        setFormValues(initialForm);
      }
      setLoading(false);
    });
  }, [id, location.state]);

  const handleInputChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Go to Payment Mode select screen
  };

  const handlePaymentChoice = async (mode) => {
    setSubmitting(true);
    
    // Simulate ref ID generation
    const mockRefId = 'RP-' + Math.floor(10000 + Math.random() * 90000);
    const amountVal = parseFloat(formValues.amount) || 1.00;

    // TODO: REPLACE WITH REAL API CALL TO BACKEND
    // 1. Send request details to backend: POST /api/services/request
    //    body: { serviceId: service.id, formData: formValues, amount: amountVal, paymentMode: mode }
    // 2. If mode === 'Online', call Cashfree checkout session API /api/payments/create-order
    // 3. Initiate Cashfree checkout SDK web checkout redirect

    // Save request locally to session history so History page updates instantly
    try {
      await addHistoryRequest({
        refId: mockRefId,
        serviceId: service.id,
        serviceTitle: service.title,
        icon: service.icon,
        amount: amountVal,
        mode: mode === 'Online' ? 'Online' : 'Assisted'
      });
    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
    // Navigate to payment status
    navigate(`/payment-status?refId=${mockRefId}&mode=${mode}&service=${encodeURIComponent(service.title)}`);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Loading service forms...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <Link to="/services" className="text-amber-600 hover:underline mt-4 inline-block">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <Link to="/services" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center">
                <DynamicIcon name={service.icon} className="h-7 w-7" />
              </div>
              <div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {service.tag}
                </span>
                <h1 className="text-xl font-extrabold mt-1">{service.title}</h1>
                <p className="text-xs text-slate-400 mt-0.5">{service.category}</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            
            {step === 1 ? (
              /* Step 1: Input Fields */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Required Service Details
                </h3>

                <div className="grid grid-cols-1 gap-5">
                  {service.fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          required={field.required}
                          value={formValues[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        >
                          <option value="">Select option</option>
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'file' ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-250 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-colors">
                          <div className="space-y-1 text-center">
                            <DynamicIcon name="FileText" className="mx-auto h-10 w-10 text-slate-400" />
                            <div className="flex text-sm text-slate-650">
                              <label className="relative cursor-pointer bg-white rounded-md font-semibold text-amber-600 hover:text-amber-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input
                                  type="file"
                                  required={field.required}
                                  onChange={(e) => handleInputChange(field.name, e.target.files[0]?.name || '')}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                            {formValues[field.name] && (
                              <p className="text-xs text-emerald-600 font-semibold mt-1">✓ {formValues[field.name]}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                          value={formValues[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure SSL Connection
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-850 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Proceed to Payment
                  </button>
                </div>

              </form>
            ) : (
              /* Step 2: Download App Prompt */
              <div className="space-y-6 animate-fadeIn py-4">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                    <Lock className="h-10 w-10 text-amber-600" />
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Secure Authentication Required
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
                    To complete your <span className="font-bold text-slate-700">{service.title}</span> securely, please download the RudranPay mobile application. Our app provides bank-grade encryption for all transactions.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => alert("Downloading iOS App...")} className="bg-slate-950 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 w-full sm:w-auto">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-[0.6rem] opacity-80 leading-none mb-1">Download on the</div>
                        <div className="text-sm font-bold leading-none">App Store</div>
                      </div>
                    </button>
                    
                    <button onClick={() => alert("Downloading Android App...")} className="bg-slate-950 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 w-full sm:w-auto">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M14.77 13.08L16.08 14.39L4.85 20.84L14.77 13.08M14.77 10.92L4.85 3.16L16.08 9.61L14.77 10.92M17.15 10.23L20.31 12L17.15 13.77L15.35 12L17.15 10.23Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-[0.6rem] opacity-80 leading-none mb-1">GET IT ON</div>
                        <div className="text-sm font-bold leading-none">Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
