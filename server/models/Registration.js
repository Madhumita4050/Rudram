const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherHusbandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  post: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  block: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true, // Will store file path/name
  },
  feeAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paymentMode: {
    type: DataTypes.STRING,
    defaultValue: 'PhonePe / UPI QR',
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true, // UTR or UPI Reference Number
  },
  paymentProof: {
    type: DataTypes.STRING,
    allowNull: true, // Receipt screenshot image path
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Rejected'),
    defaultValue: 'Pending',
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Registration;
