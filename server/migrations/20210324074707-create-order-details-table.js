'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("order_details", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      buyer_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id"
        }
      },
      seller_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id"
        }
      },
      product_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        }
      },
      delivered: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      delivered_from: {
        type: Sequelize.DataTypes.INTEGER
      },
      delivered_to: {
        type: Sequelize.DataTypes.INTEGER
      },
      paid: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      time_for_delivery: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
