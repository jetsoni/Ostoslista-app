require('dotenv').config();

const secrets = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI
}

module.exports = secrets;
