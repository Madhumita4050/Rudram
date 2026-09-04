export const services = [
  {
    id: 'mobile-dth-recharge',
    title: 'Mobile & DTH Recharge',
    category: 'Recharge & Bills',
    tag: 'Popular',
    icon: 'Smartphone',
    description: 'Instantly recharge your mobile network or pay DTH television subscriptions.',
    fields: [
      { name: 'number', label: 'Mobile / Subscriber ID', type: 'text', required: true, placeholder: 'Enter 10-digit number' },
      { name: 'operator', label: 'Operator', type: 'select', required: true, options: ['Airtel', 'Jio', 'Vi', 'BSNL', 'Tata Play', 'Dish TV'] },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, placeholder: 'Enter amount to recharge' }
    ]
  },
  {
    id: 'fastag-recharge',
    title: 'FASTag Recharge',
    category: 'Recharge & Bills',
    tag: 'Instant',
    icon: 'CreditCard',
    description: 'Top up your highway FASTag wallet instantly to avoid toll booth queues.',
    fields: [
      { name: 'vehicleNumber', label: 'Vehicle Registration Number', type: 'text', required: true, placeholder: 'e.g. DL3CAY1234' },
      { name: 'bank', label: 'Issuing Bank', type: 'select', required: true, options: ['HDFC Bank', 'ICICI Bank', 'SBI FASTag', 'Paytm Bank', 'Axis Bank'] },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, placeholder: 'Enter top-up amount' }
    ]
  },
  {
    id: 'utility-bills',
    title: 'Utility Bill Payments',
    category: 'Recharge & Bills',
    tag: 'Essential',
    icon: 'Zap',
    description: 'Pay electricity, water, gas, and broadband landline bills safely.',
    fields: [
      { name: 'billType', label: 'Bill Category', type: 'select', required: true, options: ['Electricity', 'Water', 'LPG Gas Cylinder', 'Broadband / Landline'] },
      { name: 'provider', label: 'Service Board / Provider', type: 'text', required: true, placeholder: 'e.g. BSES Yamuna, Delhi Jal Board' },
      { name: 'consumerNumber', label: 'Consumer Connection Number', type: 'text', required: true, placeholder: 'Enter account or consumer ID' },
      { name: 'amount', label: 'Bill Amount (₹)', type: 'number', required: true, placeholder: 'Enter bill amount' }
    ]
  },
  {
    id: 'insurance-premium',
    title: 'Insurance Premium Payment',
    category: 'Recharge & Bills',
    tag: 'Secure',
    icon: 'Shield',
    description: 'Keep your policies active by paying premium amounts securely online.',
    fields: [
      { name: 'insurer', label: 'Insurance Provider', type: 'select', required: true, options: ['LIC of India', 'HDFC Ergo', 'ICICI Prudential', 'SBI Life', 'Star Health'] },
      { name: 'policyNumber', label: 'Policy Number', type: 'text', required: true, placeholder: 'Enter policy reference number' },
      { name: 'amount', label: 'Premium Amount (₹)', type: 'number', required: true, placeholder: 'Enter premium amount' }
    ]
  },
  {
    id: 'loan-emi',
    title: 'Loan EMI & Loan Referral',
    category: 'Recharge & Bills',
    tag: 'Assisted',
    icon: 'DollarSign',
    description: 'Pay your monthly loan EMIs or submit a referral for a new loan.',
    fields: [
      { name: 'loanType', label: 'Service Mode', type: 'select', required: true, options: ['Pay Existing EMI', 'New Loan Referral Request'] },
      { name: 'lender', label: 'Lending Bank / NBFC', type: 'select', required: true, options: ['HDFC Bank', 'Bajaj Finserv', 'L&T Finance', 'Muthoot Finance'] },
      { name: 'loanAccount', label: 'Loan Account Number', type: 'text', required: false, placeholder: 'Enter loan account number (Optional for new request)' },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, placeholder: 'Enter EMI or requested loan amount' }
    ]
  },
  {
    id: 'money-transfer-dmt',
    title: 'Domestic Money Transfer / DMT',
    category: 'Banking & Money',
    tag: 'Assisted',
    icon: 'Send',
    description: 'Transfer funds instantly to any bank account in India, 24/7.',
    fields: [
      { name: 'senderName', label: 'Sender Name', type: 'text', required: true, placeholder: 'Enter sender name' },
      { name: 'receiverName', label: 'Beneficiary Name', type: 'text', required: true, placeholder: 'Enter beneficiary name' },
      { name: 'accountNumber', label: 'Receiver Account Number', type: 'text', required: true, placeholder: 'Enter account number' },
      { name: 'ifsc', label: 'Bank IFSC Code', type: 'text', required: true, placeholder: 'e.g. SBIN0001234' },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, placeholder: 'Enter transfer amount' }
    ]
  },
  {
    id: 'aeps-aadhaar-banking',
    title: 'AEPS / Aadhaar Banking',
    category: 'Banking & Money',
    tag: 'Biometric',
    icon: 'Fingerprint',
    description: 'Perform withdrawals, mini statements, and inquiries via biometric Aadhaar.',
    fields: [
      { name: 'aadhaarNumber', label: 'Aadhaar Card Number', type: 'text', required: true, placeholder: 'Enter 12-digit Aadhaar' },
      { name: 'bankName', label: 'Select Linked Bank', type: 'select', required: true, options: ['State Bank of India', 'Punjab National Bank', 'Bank of Baroda', 'Union Bank', 'HDFC Bank'] },
      { name: 'txType', label: 'Transaction Action', type: 'select', required: true, options: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'] },
      { name: 'amount', label: 'Amount (₹) (For withdrawal only)', type: 'number', required: false, placeholder: 'Enter withdrawal amount' }
    ]
  },
  {
    id: 'micro-atm-kiosk',
    title: 'Micro-ATM & Kiosk Services',
    category: 'Banking & Money',
    tag: 'Kiosk',
    icon: 'Cpu',
    description: 'Access local neighborhood micro-ATM terminal withdrawal services.',
    fields: [
      { name: 'terminalId', label: 'Kiosk Terminal ID', type: 'text', required: true, placeholder: 'Enter 8-digit Kiosk ID' },
      { name: 'cardRef', label: 'Card Ref / Biometric Reference', type: 'text', required: true, placeholder: 'Enter reference or scan ID' },
      { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, placeholder: 'Enter cash amount' }
    ]
  },
  {
    id: 'digital-gold',
    title: 'Digital Gold Buy & Save',
    category: 'Banking & Money',
    tag: '24K Pure',
    icon: 'Coins',
    description: 'Buy and accumulate 24K pure digital gold in secure insured lockers.',
    fields: [
      { name: 'buyType', label: 'Purchase Type', type: 'select', required: true, options: ['Buy by Value (₹)', 'Buy by Weight (Grams)'] },
      { name: 'amount', label: 'Amount / Grams', type: 'number', required: true, placeholder: 'Enter purchase amount or weight' },
      { name: 'lockerRef', label: 'Locker Wallet Reference', type: 'text', required: true, placeholder: 'Enter registered mobile / wallet' }
    ]
  },
  {
    id: 'pan-card-apply',
    title: 'PAN Card Apply / Download',
    category: 'Identity & Govt',
    tag: 'Government',
    icon: 'FileText',
    description: 'Apply for fresh PAN card allotment or download digital e-PAN copy.',
    fields: [
      { name: 'fullName', label: 'Full Name (As in Aadhaar)', type: 'text', required: true, placeholder: 'Enter applicant full name' },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: true, placeholder: 'Enter 12-digit Aadhaar' },
      { name: 'address', label: 'Full Address', type: 'text', required: true, placeholder: 'Enter residential address' }
    ]
  },
  {
    id: 'csc-certificates',
    title: 'Government & CSC Certificates',
    category: 'Identity & Govt',
    tag: 'CSC Portal',
    icon: 'Award',
    description: 'Apply for Income, Caste, Domicile, and Ration Card certificates.',
    fields: [
      { name: 'certType', label: 'Certificate Type', type: 'select', required: true, options: ['Income Certificate', 'Caste Certificate', 'Domicile Certificate', 'Ration Card Service'] },
      { name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, placeholder: 'Enter full name' },
      { name: 'details', label: 'Applicant Details / Reason', type: 'text', required: true, placeholder: 'Provide parents names and details' }
    ]
  },
  {
    id: 'travel-booking',
    title: 'Travel Booking Services',
    category: 'Travel',
    tag: 'Travel',
    icon: 'Compass',
    description: 'Book train tickets (IRCTC Authorized), bus connections, or flights.',
    fields: [
      { name: 'travelType', label: 'Mode of Travel', type: 'select', required: true, options: ['Train Ticket (IRCTC)', 'Bus Booking', 'Flight Booking'] },
      { name: 'fromCity', label: 'From (Station/City)', type: 'text', required: true, placeholder: 'Origin city' },
      { name: 'toCity', label: 'To (Station/City)', type: 'text', required: true, placeholder: 'Destination city' },
      { name: 'date', label: 'Travel Date', type: 'date', required: true },
      { name: 'passengers', label: 'Passenger Names & Ages', type: 'text', required: true, placeholder: 'e.g. Vijay (45), Neha (42)' }
    ]
  }
];
