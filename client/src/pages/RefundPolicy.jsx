import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Refund & Cancellation Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: August 2026</p>
        
        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Can I cancel a transaction once initiated?</h2>
            <p>Cancellations are generally not permitted once a transaction (like a recharge or utility payment) has been submitted to the operator. Digital services are fulfilled instantly, meaning cancellation requests cannot usually be entertained once the process has started.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. What happens if a transaction fails but money is deducted?</h2>
            <p>If your bank account is debited but the transaction fails on our platform, the amount is automatically scheduled for a refund. Depending on the payment gateway and your bank, this refund will reflect in your account within 5 to 7 working days.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. How do I request a manual refund?</h2>
            <p>If you believe you are entitled to a refund due to a service error, you can raise a support ticket via the 'Contact Us' or 'Grievance' section. You must provide the transaction reference ID, date, and amount within 30 days of the disputed transaction.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. How long does it take to process a manual refund?</h2>
            <p>Once a manual refund request is approved by our team, it typically takes 3 to 5 business days for the funds to be credited back to your original payment method. Bank holidays may cause additional delays.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Can I get a refund if I entered the wrong recharge number?</h2>
            <p>Unfortunately, if a recharge or bill payment is successful for a wrong number or consumer ID provided by you, we cannot process a refund. It is the user's responsibility to double-check all details before confirming a payment.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. Are convenience fees refundable?</h2>
            <p>No, convenience fees, platform fees, or payment gateway charges applied to successful or failed transactions are strictly non-refundable, as these are levied by third-party service providers for processing the request.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. What is the refund policy for DMT (Domestic Money Transfer)?</h2>
            <p>For DMT, if a transfer fails, the amount is credited back to the sender's wallet or source account immediately or within T+2 bank working days. Successful DMT transfers cannot be reversed or refunded under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">8. How are AEPS (Aadhaar Enabled Payment System) disputes handled?</h2>
            <p>In case of an AEPS cash withdrawal failure where the customer's bank account is debited but cash is not dispensed, the customer's bank will automatically reverse the charge within 5 to 7 working days as per NPCI guidelines. We do not hold these funds.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">9. Is it possible to cancel a Pan Card or CSC Certificate application?</h2>
            <p>Once an application for a government certificate or PAN card is submitted to the respective authority portal through our system, it cannot be canceled or refunded, even if the application is subsequently rejected by the authority.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">10. What is the policy for travel bookings (Train/Flight/Bus)?</h2>
            <p>Cancellations and refunds for travel bookings are strictly governed by the respective operators (e.g., IRCTC, Airlines). Any refund processed by the operator will be credited to your account after deducting standard cancellation charges and our service fee.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">11. Can a refund be sent to a different bank account?</h2>
            <p>No, to comply with anti-money laundering (AML) regulations, all refunds must be credited back to the original source of payment (the exact bank account, card, or wallet used for the transaction).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">12. How do I escalate a delayed refund?</h2>
            <p>If you have not received your refund within the stipulated 7 working days, you can escalate the issue by contacting our Grievance Officer with your support ticket number. We will coordinate with the payment gateway to expedite the resolution.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">13. What if a refund is processed to a closed bank account?</h2>
            <p>If the original source account or card has been closed or expired since the transaction date, the refund will still be routed to your bank. You will need to contact your bank with the Acquirer Reference Number (ARN) provided by us to claim the funds.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">14. Are partial refunds allowed?</h2>
            <p>We do not support partial refunds for single-transaction services like recharges or bill payments. A transaction is either entirely successful or failed. For bulk payments, refunds are only issued for the specific sub-transactions that failed.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">15. How are refunds for digital gold purchases handled?</h2>
            <p>Once a digital gold purchase is successfully executed and the gold is credited to your secure locker, it cannot be canceled or refunded due to real-time market price fluctuations. You may only sell the gold back at the prevailing market rate.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
