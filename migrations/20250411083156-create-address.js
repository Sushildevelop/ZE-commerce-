'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
      },
      type: { type: Sequelize.ENUM('shipping', 'billing'), allowNull: false },
      fullName: Sequelize.STRING,
      phone: Sequelize.STRING,
      addressLine1: Sequelize.STRING,
      addressLine2: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      postalCode: Sequelize.STRING,
      country: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('Addresses');
  }
};
