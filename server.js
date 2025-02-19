// express
const express = require("express");
const app = express();
// serverless http
const serverless = require("serverless-http");
// sequelize
const sequelize = require("./config/db");
//cors
const cors = require("cors");
// dontenv
const dotenv = require("dotenv");
dotenv.config();
// cookieParser
const cookieParser = require("cookie-parser");
// User
const User = require("./models/User");
// middleware
const authenticateToken = require("./middleware/authMiddleware");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page");
});

// routes
const routeDashboard = require("./routes/dashboard");
app.use("/dashboard", authenticateToken, routeDashboard);
const routeLogin = require("./routes/login");
app.use("/login", routeLogin);
const routeRegister = require("./routes/Register");
app.use("/register", routeRegister);
const routeLogout = require("./routes/logout");
app.use("/logout", routeLogout);
const routeAuthCheck = require("./routes/authCheck");
app.use("/auth-check", routeAuthCheck);

module.exports.handler = serverless(app);
