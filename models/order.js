const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, { foreignKey: 'userId' });
      Orders.hasMany(models.OrderItems,{foreignKey:"orderId"});
      Orders.belongsTo(models.Products)
      // Orders.hasOne(models.Payments);
      // Orders.belongsTo(models.Addresses, { as: 'ShippingAddress', foreignKey: 'shippingAddressId' });
      // Orders.belongsTo(models.Addresses, { as: 'BillingAddress', foreignKey: 'billingAddressId' });
    }
  }

  Orders.init({
   
    userId: { type: DataTypes.INTEGER, allowNull: false },
    orderNumber: { type: DataTypes.STRING, unique: true },
    totalAmount: DataTypes.DECIMAL(10,2),
    status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'), defaultValue: 'pending' },
    paymentStatus: { type: DataTypes.ENUM('pending', 'paid', 'failed'), defaultValue: 'pending' },
    shippingAddressId: { type: DataTypes.STRING },
    billingAddressId: { type: DataTypes.STRING },
    placedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
    timestamps: true
  });

  return Orders;
};
