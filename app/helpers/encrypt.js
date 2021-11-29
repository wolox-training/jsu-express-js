const bcrypt = require('bcrypt');
const config = require('../../config');

exports.toEncrypt = data => {
  const salt = bcrypt.genSaltSync(config.common.saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

exports.compareEncrypt = (data, dataEncripted) => bcrypt.compareSync(data, dataEncripted);
