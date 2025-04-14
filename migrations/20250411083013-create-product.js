'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: Sequelize.STRING,
      
      description: Sequelize.TEXT,
      price: Sequelize.DECIMAL(10,2),
      discount: { type: Sequelize.DECIMAL(10,2), defaultValue: 0 },
      stock: Sequelize.INTEGER,
      isAvailable: { type: Sequelize.BOOLEAN, defaultValue: true },
      image:{
        type:Sequelize.STRING

      },
      brand: Sequelize.STRING,
      thumbnail: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
