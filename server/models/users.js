'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Products, { foreignKey: "seller_id", as: "products" });

      User.hasMany(models.OrderDetails, { foreignKey: "buyer_id", as: "order_details" });

      User.hasOne(models.Address, { sourceKey: "address_id", foreignKey: "id", as: "address" });

      User.hasMany(models.MessageRooms, { foreignKey: "user_id" });
      User.hasMany(models.MessageRooms, { foreignKey: "seller_id" });
      // Address.belongsTo(models.User, {targetKey:"address_id",foreignKey: "address_id", as: "address" });
    }
  };
  User.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    google_id: DataTypes.TEXT,
    application_rating: DataTypes.STRING,
    address_id: DataTypes.INTEGER,
    total_expenditure: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};