'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      is_used_product: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      product_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      product_price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      product_quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      product_sub_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      seller_id: {
        type:Sequelize.DataTypes.INTEGER,        
        allowNull: false,
        references: {
          model: "users",
          key: "user_id"
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
