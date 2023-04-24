const config = require("../config/default");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "no auth" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: "no auth" });
  }
};
