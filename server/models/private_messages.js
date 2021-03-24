'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PrivateMessages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    PrivateMessages.init({    
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: DataTypes.INTEGER,
        message: DataTypes.TEXT,  
        room_id: DataTypes.INTEGER,        
    }, {
        sequelize,
        modelName: 'PrivateMessages',
        tableName: "private_messages"
    });
    // PrivateMessages.removeAttribute('id');
    return PrivateMessages;
};