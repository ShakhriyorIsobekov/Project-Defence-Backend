const { Sequelize } = require("sequelize");
// dotenv
const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize("my_db", "admin", "Ac_1267981", {
//   host: "database-1.cfc4g44euxu4.eu-north-1.rds.amazonaws.com",
//   dialect: "mysql",
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = sequelize;
