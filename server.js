const express = require("express");
const app = express();
const sequelize = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Home page");
});

const routeLogin = require("./routes/login");
app.use("/login", routeLogin);

const routeRegister = require("./routes/Register");
app.use("/register", routeRegister);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
