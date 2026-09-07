const PaymentSetting = require('../models/PaymentSetting');

// Helper to get or initialize payment settings (singleton)
const getOrCreateSettings = async () => {
  let settings = await PaymentSetting.findByPk(1);
  if (!settings) {
    settings = await PaymentSetting.create({
      id: 1,
      payeeName: 'RUDRANARAYAN RUDRAN',
      upiId: 'rudranarayan@upi',
      qrCodeImage: 'uploads/payment-qr.png',
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
      instructions: 'Scan the QR code with any UPI App (PhonePe, Google Pay, Paytm, BHIM), complete the payment, and enter your 12-digit UTR/UPI Reference ID below.'
    });
  }
  return settings;
};

// Public endpoint to get active payment settings
exports.getPaymentSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    res.status(500).json({ message: 'Failed to fetch payment settings', error: error.message });
  }
};

// Admin endpoint to update payment settings
exports.updatePaymentSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();

    const {
      payeeName,
      upiId,
      founderMemberFee,
      fieldOfficerFee,
      computerOperatorFee,
      personalAssistantFee,
      bankName,
      accountNumber,
      ifscCode,
      accountHolder,
      isUpiActive,
      isBankActive,
      isCashActive,
      instructions
    } = req.body;

    if (payeeName !== undefined) settings.payeeName = payeeName;
    if (upiId !== undefined) settings.upiId = upiId;
    if (founderMemberFee !== undefined) settings.founderMemberFee = parseFloat(founderMemberFee) || 0;
    if (fieldOfficerFee !== undefined) settings.fieldOfficerFee = parseFloat(fieldOfficerFee) || 0;
    if (computerOperatorFee !== undefined) settings.computerOperatorFee = parseFloat(computerOperatorFee) || 0;
    if (personalAssistantFee !== undefined) settings.personalAssistantFee = parseFloat(personalAssistantFee) || 0;
    if (bankName !== undefined) settings.bankName = bankName;
    if (accountNumber !== undefined) settings.accountNumber = accountNumber;
    if (ifscCode !== undefined) settings.ifscCode = ifscCode;
    if (accountHolder !== undefined) settings.accountHolder = accountHolder;
    if (isUpiActive !== undefined) settings.isUpiActive = String(isUpiActive) === 'true' || isUpiActive === true;
    if (isBankActive !== undefined) settings.isBankActive = String(isBankActive) === 'true' || isBankActive === true;
    if (isCashActive !== undefined) settings.isCashActive = String(isCashActive) === 'true' || isCashActive === true;
    if (instructions !== undefined) settings.instructions = instructions;

    if (req.file) {
      settings.qrCodeImage = req.file.path.replace(/\\/g, '/');
    }

    await settings.save();

    res.status(200).json({
      message: 'Payment settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Error updating payment settings:', error);
    res.status(500).json({ message: 'Failed to update payment settings', error: error.message });
  }
};
