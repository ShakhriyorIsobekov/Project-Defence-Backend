// express
const express = require("express");
const app = express();
// sequelize
const sequelize = require("./config/db");
// dontenv
const dotenv = require("dotenv");
dotenv.config();
// User
const User = require("./models/User");
app.use(express.json());

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
