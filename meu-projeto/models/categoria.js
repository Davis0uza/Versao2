const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(1024),
    allowNull: true
  }
}, {
  tableName: 'CATEGORIA',
  timestamps: false
});

module.exports = Categoria;
