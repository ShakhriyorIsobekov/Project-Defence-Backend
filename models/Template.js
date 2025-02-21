const { DataTypes } = require("sequelize");
const sequelize = require("sequelize");
const User = require("./User");

const Template = sequelize.define("Template", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    reference: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Template, { foreignKey: "userId" });
Template.belongsTo(User, { foreignKey: "userId" });

module.exports = Template;
