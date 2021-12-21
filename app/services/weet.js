const axios = require('axios');
const errors = require('../errors');
const logger = require('../logger');
const { Weet } = require('../models');

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
    logger.info(error);
    throw errors.apiError('Error to get geeks phrase');
  }
};

exports.saveWeet = async weet => {
  try {
    const weetUser = await Weet.create(weet);
    return weetUser;
  } catch (error) {
    logger.info(error);
    throw errors.databaseError('Error to save weet');
  }
};
