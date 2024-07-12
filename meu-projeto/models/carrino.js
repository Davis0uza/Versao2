const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrino = sequelize.define('Carrino', {
  id_carrinho: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: true
  },
  produtos: { 
    type: DataTypes.STRING, 
    allowNull: true
  }
}, {
  tableName: 'CARRINO',
  timestamps: false
});

module.exports = Carrino;
