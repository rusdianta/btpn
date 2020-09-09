const md5 = require("md5")

const encrypt = (value) => {
  return md5(value);
};

module.exports = {
  encrypt
}