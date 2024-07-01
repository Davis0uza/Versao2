const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gestores = sequelize.define('Gestores', {
  id_gestor: {
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
  tableName: 'GESTORES',
  timestamps: false
});

module.exports = Gestores;
