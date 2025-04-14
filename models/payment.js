const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payments extends Model {
    static associate(models) {
      // Payments.belongsTo(models.Orders);
    }
  }

  Payments.init({
    
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    paymentMethod: { type: DataTypes.ENUM('card', 'paypal', 'bank_transfer', 'cash_on_delivery') },
    paymentProvider: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2),
    status: { type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'), defaultValue: 'pending' },
    transactionId: DataTypes.STRING,
    paidAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payments',
    timestamps: true
  });

  return Payments;
};
