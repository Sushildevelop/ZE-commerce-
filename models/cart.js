const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Carts extends Model {
    static associate(models) {
      // Carts.belongsTo(models.Users);
      // Carts.belongsTo(models.Products);
    }
  }

  Carts.init({

    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    selected: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Carts',
    timestamps: true
  });

  return Carts;
};
