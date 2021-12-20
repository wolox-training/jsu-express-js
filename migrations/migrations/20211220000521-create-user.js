'use strict';

const encrypt = require('../../app/helpers/encrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        // eslint-disable-next-line
        type: Sequelize.ENUM('regular', 'admin')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    const admin = {
      first_name: 'admin',
      last_name: 'admin',
      role: 'admin',
      email: process.env.USER_ADMIN_EMAIL,
      password: encrypt.toEncrypt(process.env.USER_ADMIN_PASSWORD),
      created_at: new Date(),
      updated_at: new Date()
    };
    await queryInterface.bulkInsert('users', [admin]);
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
