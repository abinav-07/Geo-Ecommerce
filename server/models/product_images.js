'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductImages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // ProductImages.hasMany(models.Products);;
        }
    };
    ProductImages.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        image: DataTypes.TEXT,
        product_id: DataTypes.INTEGER,        
    }, {
        sequelize,
        modelName: 'ProductImages',
        tableName: "product_images"
    });
    return ProductImages;
};