const axios = require('axios');
const errors = require('../errors');
const logger = require('../logger');

const { apiGeeks } = require('../../config').common.api;

exports.getGeekPhrase = async () => {
  try {
    const configRequest = {
      method: 'get',
      url: `${apiGeeks}?format=json`
    };
    const { data: response } = await axios(configRequest);
    return response;
  } catch (error) {
    logger.errors(error);
    throw errors.apiError('Error to get geeks phrase');
  }
};
