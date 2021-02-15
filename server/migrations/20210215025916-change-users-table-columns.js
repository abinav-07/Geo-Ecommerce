'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async(t)=>{
      await queryInterface.changeColumn("users","first_name",{
        type:Sequelize.DataTypes.STRING,
        allowNull:true,
      });

      await queryInterface.changeColumn("users","last_name",{
        type:Sequelize.DataTypes.STRING,
        allowNull:true,
      });

      await queryInterface.addColumn("users","address_id",{
        type:Sequelize.DataTypes.INTEGER
      })
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
