const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrderItems extends Model {
    static associate(models) {
      OrderItems.belongsTo(models.Orders, { foreignKey: 'orderId' });
      OrderItems.belongsTo(models.Products, { foreignKey: 'productId' });
    }
  }

  OrderItems.init({
   
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL(10,2),
    discount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'OrderItems',
    timestamps: true
  });

  return OrderItems;
};
