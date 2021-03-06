'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        field: "username"
      },
      uniqueId: {
        type: Sequelize.STRING,
        field: "unique_id"
      },
      savedArt: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: "saved_art",
        default: [],
      },
      overheadImages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: "overhead_images",
        default: [],
      },
      wallImages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: "wall_images",
        default: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
