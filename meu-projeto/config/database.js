const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Projeto3', 'postgres', 'pgadmin', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
