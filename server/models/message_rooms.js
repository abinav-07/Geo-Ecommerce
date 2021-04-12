'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MessageRooms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MessageRooms.hasMany(models.PrivateMessages, { foreignKey: "room_id", as: "messages", onDelete: "CASCADE" });
            MessageRooms.belongsTo(models.Products, { foreignKey: "product_id" })
        }
    };
    MessageRooms.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        seller_id: DataTypes.INTEGER,
        socket_room: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'MessageRooms',
        tableName: "message_rooms"
    });
    return MessageRooms;
};