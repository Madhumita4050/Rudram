const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentSetting = sequelize.define('PaymentSetting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payeeName: {
    type: DataTypes.STRING,
    defaultValue: 'RUDRANARAYAN RUDRAN',
  },
  upiId: {
    type: DataTypes.STRING,
    defaultValue: 'rudranarayan@upi',
  },
  qrCodeImage: {
    type: DataTypes.STRING,
    defaultValue: 'uploads/payment-qr.png',
  },
  founderMemberFee: {
    type: DataTypes.FLOAT,
    defaultValue: 830,
  },
  fieldOfficerFee: {
    type: DataTypes.FLOAT,
    defaultValue: 570,
  },
  computerOperatorFee: {
    type: DataTypes.FLOAT,
    defaultValue: 450,
  },
  personalAssistantFee: {
    type: DataTypes.FLOAT,
    defaultValue: 1200,
  },
  bankName: {
    type: DataTypes.STRING,
    defaultValue: 'State Bank of India',
  },
  accountNumber: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  ifscCode: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  accountHolder: {
    type: DataTypes.STRING,
    defaultValue: 'RUDRANARAYAN RUDRAN',
  },
  isUpiActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isBankActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isCashActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  instructions: {
    type: DataTypes.TEXT,
    defaultValue: 'Scan the QR code with any UPI App (PhonePe, Google Pay, Paytm, BHIM), complete the payment, and enter your 12-digit UTR/UPI Reference ID below.',
  },
}, {
  timestamps: true,
});

module.exports = PaymentSetting;
