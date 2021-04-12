'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeConstraint("message_rooms", "message_rooms_ibfk_1", { transaction: t });


      await queryInterface.removeConstraint("message_rooms", "message_rooms_ibfk_2", { transaction: t });


      await queryInterface.removeConstraint("message_rooms", "message_rooms_ibfk_3", { transaction: t });


      await queryInterface.removeConstraint("private_messages", "private_messages_ibfk_1", { transaction: t });



      await queryInterface.removeConstraint("private_messages", "private_messages_ibfk_2", { transaction: t });

      await queryInterface.removeConstraint("order_details", "order_details_ibfk_1", { transaction: t });


      await queryInterface.removeConstraint("order_details", "order_details_ibfk_2", { transaction: t });



      await queryInterface.removeConstraint("order_details", "order_details_ibfk_3", { transaction: t });

      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
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
