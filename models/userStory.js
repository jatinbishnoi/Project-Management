const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserStory = sequelize.define(
  "UserStory",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    story: { type: DataTypes.TEXT, allowNull: false },
    projectId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "user_stories",
    timestamps: true,
  }
);
// Sync the model with the database
module.exports = UserStory;
