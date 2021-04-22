'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductReviews extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ProductReviews.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        reviews: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'ProductReviews',
        tableName: "product_reviews"
    });
    return ProductReviews;
};