const bcrypt = require("bcrypt");

const generatePass = async (password) => {
  const hash = await bcrypt.hash(password, 10);

  return hash;
};

const comparePass = async (pass, hash) => {
  const isValid = await bcrypt.compare(pass, hash);
  return isValid;
};

module.exports = { generatePass, comparePass };
