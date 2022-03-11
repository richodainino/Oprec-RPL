const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const config = {
  dbUri: process.env.MONGO_URI,
  port: process.env.PORT || 8000,
};

module.exports = config;