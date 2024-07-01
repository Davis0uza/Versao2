const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Versao = sequelize.define('Versao', {
  id_versao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'VERSAO',
  timestamps: false
});

module.exports = Versao;
