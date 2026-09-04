import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, FileText, ArrowLeft, Home } from 'lucide-react';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('refId') || 'RP-MOCK1234';
  const mode = searchParams.get('mode') || 'Online';
  const service = searchParams.get('service') || 'Digital Service';

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-center">
        
        {/* Status Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {/* Status Text */}
        <h1 className="text-2xl font-extrabold text-slate-900">Transaction Successful!</h1>
        <p className="text-sm text-slate-500 mt-2">
          Your request for <span className="font-bold text-slate-700">{service}</span> has been processed successfully.
        </p>

        {/* Transaction Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 my-6 text-left space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Reference ID</span>
            <span className="font-bold text-slate-950">{refId}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Payment Mode</span>
            <span className="font-bold text-slate-700 bg-slate-200/50 px-2 py-0.5 rounded-full capitalize">
              {mode === 'Online' ? 'Instant Online' : 'Agent Assisted'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Status</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
              {mode === 'Online' ? 'In Progress' : 'Pending Verification'}
            </span>
          </div>
        </div>

        {/* Informative Note */}
        <p className="text-[11px] text-slate-450 leading-relaxed px-2 mb-6">
          {mode === 'Online' 
            ? 'The payment is verified. Your DTH/mobile network operator or utility provider will credit your balance within a few minutes.' 
            : 'Your request has been sent to our local agent queue. An agent will contact you shortly to collect cash payment and process the certificate/service.'}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/history"
            className="flex items-center justify-center gap-1.5 border border-slate-250 hover:bg-slate-50 text-slate-700 font-semibold text-sm py-3 rounded-xl transition-all"
          >
            <FileText className="h-4 w-4" /> View History
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-sm"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}
