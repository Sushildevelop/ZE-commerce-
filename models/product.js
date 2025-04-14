const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Products extends Model {
    static associate(models) {
      // Products.belongsToMany(models.Users, { through: models.Carts });
      Products.hasMany(models.OrderItems, { foreignKey: 'productId' });
      Products.hasMany(models.Carts,{foreignKey:"productId"});
    }
  }

  Products.init({
    
    name: DataTypes.STRING,

    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    image:DataTypes.STRING,
    discount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    stock: DataTypes.INTEGER,
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
    brand: DataTypes.STRING,
    thumbnail: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true
  });

  return Products;
};
