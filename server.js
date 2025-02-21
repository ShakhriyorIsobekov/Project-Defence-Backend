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
// User
const User = require("./models/User");
// middleware

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173/",
      "https://project-defence-eta.vercel.app/",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Home page");
});

// routes
const authenticateToken = require("./middleware/authMiddleware");
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

// table from template => updates without deleting data
sequelize.sync({ alter: true });

module.exports.handler = serverless(app);
