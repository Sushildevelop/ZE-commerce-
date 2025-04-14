'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: 'Users', key: 'id' }
      },
      orderNumber: { type: Sequelize.STRING, unique: true },
      totalAmount: Sequelize.DECIMAL(10,2),
      status: { type: Sequelize.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'), defaultValue: 'pending' },
      paymentStatus: { type: Sequelize.ENUM('pending', 'paid', 'failed'), defaultValue: 'pending' },
      shippingAddressId: {
        type: Sequelize.STRING,
        // references: { model: 'Addresses', key: 'id' }
      },
      billingAddressId: {
        type: Sequelize.STRING,
        // references: { model: 'Addresses', key: 'id' }
      },
      
      placedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
