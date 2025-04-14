const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Orders, { foreignKey: 'userId' });
      Users.hasMany(models.Addresses, { foreignKey: 'userId' });
    //   Users.hasMany(models.Products, { foreignKey: 'userId' });
    //   Users.hasMany(models.Addresses);
    //   Users.hasMany(models.Carts);
    }
  }

  Users.init({
   
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    image:DataTypes.STRING,
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    status: { type: DataTypes.ENUM('active', 'banned'), defaultValue: 'active' },
    lastLogin:
    {
        type: DataTypes.DATE,
     defaultValue: DataTypes.NOW
    } 
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  });

  return Users;
};
