// express
const express = require("express");
const app = express();
// sequelize
const sequelize = require("./config/db");
//cors
const cors = require("cors");
// dontenv
const dotenv = require("dotenv");
dotenv.config();
// User
const User = require("./models/User");
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page");
});

const routeLogin = require("./routes/login");
app.use("/login", routeLogin);

const routeRegister = require("./routes/Register");
app.use("/register", routeRegister);

app.listen(3000, () => {
  console.log(`Sever is running on port 3000`);
});
