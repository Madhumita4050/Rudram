const Registration = require('../models/Registration');
const PaymentSetting = require('../models/PaymentSetting');

exports.createRegistration = async (req, res) => {
  try {
    const {
      role, name, fatherHusbandName, village, post, block,
      district, state, pinCode, contactNumber, email, education,
      feeAmount, paymentMode, transactionId
    } = req.body;

    let photoPath = null;
    let paymentProofPath = null;

    if (req.files) {
      if (req.files.photo && req.files.photo[0]) {
        photoPath = req.files.photo[0].path.replace(/\\/g, '/');
      }
      if (req.files.paymentProof && req.files.paymentProof[0]) {
        paymentProofPath = req.files.paymentProof[0].path.replace(/\\/g, '/');
      }
    } else if (req.file) {
      photoPath = req.file.path.replace(/\\/g, '/');
    }

    // Determine default fee amount if not provided
    let calculatedFee = parseFloat(feeAmount) || 0;
    if (!calculatedFee) {
      const settings = await PaymentSetting.findByPk(1);
      if (settings) {
        if (role === 'Founder Member') calculatedFee = settings.founderMemberFee;
        else if (role === 'Field Officer') calculatedFee = settings.fieldOfficerFee;
        else if (role === 'Computer Operator') calculatedFee = settings.computerOperatorFee;
        else if (role === 'Personal Assistant' || role === 'Personal Assistance') calculatedFee = settings.personalAssistantFee;
      }
    }

    const newRegistration = await Registration.create({
      role,
      name,
      fatherHusbandName,
      village,
      post,
      block,
      district,
      state,
      pinCode,
      contactNumber,
      email,
      education,
      photo: photoPath,
      feeAmount: calculatedFee,
      paymentMode: paymentMode || 'PhonePe / UPI QR',
      transactionId: transactionId || null,
      paymentProof: paymentProofPath,
      paymentStatus: transactionId ? 'Pending' : 'Pending'
    });

    res.status(201).json({
      message: 'Registration submitted successfully with payment reference.',
      registrationId: newRegistration.id,
      registration: newRegistration
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId, adminNotes } = req.body;
    
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (paymentStatus) registration.paymentStatus = paymentStatus;
    if (transactionId) registration.transactionId = transactionId;
    if (adminNotes !== undefined) registration.adminNotes = adminNotes;

    await registration.save();

    res.status(200).json({ message: 'Payment status updated successfully', registration });
  } catch (error) {
    console.error('Payment Update Error:', error);
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};
