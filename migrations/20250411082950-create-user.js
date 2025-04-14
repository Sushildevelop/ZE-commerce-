'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Users",{
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      phone: Sequelize.STRING,
      role: { type: Sequelize.ENUM('user', 'admin'), defaultValue: 'user' },
      status: { type: Sequelize.ENUM('active', 'banned'), defaultValue: 'active' },
      image:{
        type:Sequelize.STRING

      },
      lastLogin:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Users")
  }
};
