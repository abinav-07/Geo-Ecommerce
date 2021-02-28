'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("product_details", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_detail: {
        type: Sequelize.DataTypes.TEXT("long"),
        allowNull: false
      },
      product_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        },
        onDelete: "CASCADE"
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
