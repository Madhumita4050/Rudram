const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Service = sequelize.define(
  'Service',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    category: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    icon: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: 'services',
  }
);

module.exports = Service;