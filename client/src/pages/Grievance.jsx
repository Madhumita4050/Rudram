import React from 'react';

export default function Grievance() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Grievance Redressal Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: August 2026</p>
        
        <div className="space-y-6 text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. What is the objective of this policy?</h2>
            <p>The objective of our Grievance Redressal Policy is to provide a structured, transparent, and timely framework for resolving customer complaints. We are committed to ensuring that all disputes are handled fairly and efficiently to maintain your trust in RudranPay.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. How can I register a grievance?</h2>
            <p>You can register a grievance by raising a support ticket via our mobile application, emailing our dedicated support team, or calling our toll-free customer helpline. Ensure you provide relevant transaction IDs and details for quicker resolution.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. What is Level 1 of the escalation matrix?</h2>
            <p>Level 1 is our Customer Support Helpdesk. When you first report an issue, it is assigned a unique ticket number and handled by our frontline executives. We aim to resolve Level 1 queries within 24 to 48 business hours.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. How do I escalate to Level 2?</h2>
            <p>If your complaint is not resolved satisfactorily at Level 1 within 48 hours, you can escalate it to the Customer Service Manager. You can do this by replying to your ticket email and requesting a Level 2 escalation.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Who is the Nodal/Grievance Officer (Level 3)?</h2>
            <p>If the issue remains unresolved after Level 2, you may contact our appointed Grievance Officer in accordance with the IT Act 2000. Name: Nodal Officer | Email: grievances@rudranpay.com | Phone: 1800-123-4567.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">6. What is the expected resolution time for escalated grievances?</h2>
            <p>The Grievance Officer aims to acknowledge your complaint within 24 hours and provide a final resolution within 15 working days from the date of receipt of the escalation, depending on the complexity of the issue.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">7. What if my grievance involves a banking partner?</h2>
            <p>For issues related to AEPS, DMT, or UPI where a partner bank is involved, the resolution time is subject to NPCI/RBI guidelines and the turnaround time of the respective acquiring/issuing bank. We act as a facilitator to expedite the process.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">8. Can I approach the RBI Ombudsman?</h2>
            <p>Yes, if your grievance related to digital transactions is not resolved by our Nodal Officer within 30 days, or if you are dissatisfied with the response, you have the right to file a complaint with the RBI Ombudsman under the Integrated Ombudsman Scheme.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">9. Is there any fee for filing a grievance?</h2>
            <p>No, filing a grievance, raising a ticket, or escalating an issue to the Grievance Officer is completely free of charge. We do not solicit any fees for resolving customer disputes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">10. Do I need to provide any documents?</h2>
            <p>Depending on the nature of the complaint (e.g., failed DMT or fraud reporting), we may request supporting documents such as a bank statement showing the debit, a copy of the SMS alert, or your KYC documents to verify your identity.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">11. How will I be updated about my complaint?</h2>
            <p>You will receive automated updates regarding the status of your complaint via email and SMS on your registered contact details whenever there is a change in the status of your ticket.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">12. Can a closed ticket be reopened?</h2>
            <p>If you are not satisfied with the resolution provided on a closed ticket, you can reopen it within 7 days by replying to the closure email. After 7 days, a new ticket will need to be created, referencing the old one.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">13. What if I receive no response at all?</h2>
            <p>If you do not receive an acknowledgment or resolution within the timeframes specified for Level 1 or Level 2, you are encouraged to directly escalate the matter to the Level 3 Grievance Officer, quoting your initial complaint reference.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">14. Can I report a fraudulent transaction here?</h2>
            <p>Yes. If you suspect your account has been compromised or you notice an unauthorized transaction, report it immediately as a Priority Grievance. We have a dedicated fraud response team that operates 24/7 to freeze accounts and block unauthorized funds.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">15. What are the operating hours for the Grievance team?</h2>
            <p>While basic Level 1 customer support is available 24/7, our specialized Level 2 teams and the Level 3 Grievance Officer operate during standard banking hours (Monday to Friday, 9:00 AM to 6:00 PM IST), excluding national and bank holidays.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
