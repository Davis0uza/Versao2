const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Assumindo que existe um modelo User

class Ticket extends Model {}

Ticket.init({
  id_ticket: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'USER', // Nome da tabela User
      key: 'id_user',
    },
  },
  id_user_resposta: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'USER', // Nome da tabela User
      key: 'id_user',
    },
  },
}, {
  sequelize,
  modelName: 'Ticket',
  tableName: 'TICKETS',
  timestamps: false,
});

Ticket.belongsTo(User, { foreignKey: 'id_user' });
Ticket.belongsTo(User, { foreignKey: 'id_user_resposta', as: 'Responder' });

module.exports = Ticket;
