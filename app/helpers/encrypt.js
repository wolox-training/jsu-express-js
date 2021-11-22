const bcrypt = require('bcrypt');

module.exports = data => {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};
