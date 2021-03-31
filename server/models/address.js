'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Address.hasMany(models.User, {sourceKey:"id", foreignKey: "address_id", as: "address" });
            // Address.belongsTo(models.User, {targetKey:"address_id",foreignKey: "address_id", as: "address" });
        }
    };
    Address.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        latitude: DataTypes.TEXT,
        longitude: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Address',
        tableName: "address"
    });
    return Address;
};