'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ProductDetails.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_detail: DataTypes.TEXT("long"),
        product_id: DataTypes.INTEGER,        
    }, {
        sequelize,
        modelName: 'ProductDetails',
        tableName: "product_details"
    });
    return ProductDetails;
};