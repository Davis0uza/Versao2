const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Projeto3', 'postgres', '180299ivaD', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
