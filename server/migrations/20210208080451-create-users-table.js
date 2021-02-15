'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users",{
      user_id:{
        type:Sequelize.DataTypes.INTEGER,        
        primaryKey: true,
        autoIncrement: true,
      },
      first_name:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      last_name:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      email:{
        type: Sequelize.DataTypes.TEXT("long"),
      },
      password:{
        type: Sequelize.DataTypes.TEXT("long"),
      },
      google_id:{
        type: Sequelize.DataTypes.TEXT("long"),
      },
      application_rating:{
        type: Sequelize.DataTypes.STRING,
      },
      company_name:{
        type: Sequelize.DataTypes.TEXT("long"),
      },
      total_expenditure:{
        type: Sequelize.DataTypes.INTEGER,
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
