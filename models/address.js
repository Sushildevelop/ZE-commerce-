const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Addresses extends Model {
    static associate(models) {
      Addresses.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }

  Addresses.init({
  
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('shipping', 'billing'), allowNull: false },
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Addresses',
    timestamps: true
  });

  return Addresses;
};
