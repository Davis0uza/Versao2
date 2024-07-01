const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoUtilizador = sequelize.define('TipoUtilizador', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(1024),
    allowNull: true
  }
}, {
  tableName: 'TIPOUTILIZADOR',
  timestamps: false
});

module.exports = TipoUtilizador;
