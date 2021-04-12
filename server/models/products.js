'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.hasMany(models.ProductImages, { foreignKey: "product_id", as: "product_images" });
            Products.hasMany(models.ProductDetails, { foreignKey: "product_id", as: "product_details" });
            Products.hasMany(models.OrderDetails, { foreignKey: "product_id", as: "order_details" });
            Products.belongsTo(models.User, { foreignKey: "seller_id", as: "user_detail" });            
            
            // ProductImages.hasMany(models.Products);;

        }
    };
    Products.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_name: DataTypes.TEXT,
        is_used_product: DataTypes.BOOLEAN,
        product_type: DataTypes.STRING,
        product_price: DataTypes.INTEGER,
        product_quantity: DataTypes.INTEGER,
        product_sub_type: DataTypes.STRING,
        seller_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Products',
        tableName: "products"
    });
    return Products;
};