require("dotenv").config();

module.exports.get = (key) => {
  return process.env[key];
};