'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Orders', key: 'id' }
      },
      paymentMethod: { type: Sequelize.ENUM('card', 'paypal', 'bank_transfer', 'cash_on_delivery') },
      paymentProvider: Sequelize.STRING,
      amount: Sequelize.DECIMAL(10,2),
      status: { type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'), defaultValue: 'pending' },
      transactionId: Sequelize.STRING,
      paidAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments')
  }
};
