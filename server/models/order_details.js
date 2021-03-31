'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderDetails.belongsTo(models.User, { foreignKey: "seller_id" });
            OrderDetails.belongsTo(models.User, { foreignKey: "buyer_id" });
            OrderDetails.belongsTo(models.Products, { foreignKey: "product_id" });
        }
    };
    OrderDetails.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        buyer_id: DataTypes.INTEGER,
        seller_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        product_quantity: DataTypes.INTEGER,
        product_price: DataTypes.INTEGER,
        delivered: DataTypes.BOOLEAN,
        delivered_from: DataTypes.JSON,
        delivered_to: DataTypes.JSON,
        paid: DataTypes.BOOLEAN,
        payment_method: DataTypes.STRING,
        time_for_delivery: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'OrderDetails',
        tableName: "order_details"
    });
    return OrderDetails;
};