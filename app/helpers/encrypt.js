const bcrypt = require('bcrypt');
const config = require('../../config');

module.exports = data => {
  const salt = bcrypt.genSaltSync(config.common.saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};
