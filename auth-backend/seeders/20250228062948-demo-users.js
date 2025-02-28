'use strict';
const argon2 = require('argon2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await argon2.hash('password123');

    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        tabel: 12345,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'user',
        tabel: 67890,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'tester',
        tabel: 13579,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'prostoVanya',
        tabel: 24680,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};