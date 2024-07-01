const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Adicione esta linha para auto incremento
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(1024),
    allowNull: true
  },
  datanasc: {
    type: DataTypes.DATE,
    allowNull: true
  },
  telemovel: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(1024),
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING(1024),
    allowNull: true
  },
  id_ticket: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_tipo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nif: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  morada: {
    type: DataTypes.STRING(1024),
    allowNull: true
  },
  fotoperfil: {
    type: DataTypes.STRING(1024),
    allowNull: true
  }
}, {
  tableName: 'USER',
  timestamps: false
});

module.exports = User;
