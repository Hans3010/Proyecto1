const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.DECIMAL(16, 2),
    allowNull: false,
    defaultValue: 1000,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recieverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
