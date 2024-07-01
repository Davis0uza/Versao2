const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_versao: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_gestor: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Iddlc: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fotoproduto: {
    type: DataTypes.STRING(1024),
    allowNull: true
  }
}, {
  tableName: 'PRODUTO',
  timestamps: false
});

module.exports = Produto;
