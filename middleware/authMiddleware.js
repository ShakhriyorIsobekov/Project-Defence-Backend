const jwt = require("jsonwebtoken");
// dontenv
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  // check
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
