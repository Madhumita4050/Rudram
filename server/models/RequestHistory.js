const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Service = require('./Service');

const RequestHistory = sequelize.define('RequestHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  refId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // Pending, Completed, Failed
  },
  mode: {
    type: DataTypes.STRING,
    defaultValue: 'Online',
  }
}, {
  timestamps: true,
});

// Define Relationships
User.hasMany(RequestHistory, { foreignKey: 'userId', as: 'requests' });
RequestHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(RequestHistory, { foreignKey: 'serviceId', as: 'history' });
RequestHistory.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

module.exports = RequestHistory;
