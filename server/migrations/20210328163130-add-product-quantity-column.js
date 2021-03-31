'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn("order_details", "product_quantity", {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        after: "product_id"
      });

      await queryInterface.changeColumn("order_details", "delivered_from", {
        type: Sequelize.DataTypes.JSON
      });
      await queryInterface.changeColumn("order_details", "delivered_to", {
        type: Sequelize.DataTypes.JSON
      });
    })
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
