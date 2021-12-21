const weetService = require('../services/weet');
const { weetResponse } = require('../serializers/weet');

exports.createWeet = async (req, res, next) => {
  try {
    const { body } = req;
    const weet = await weetService.saveWeet(body);
    return res.status(200).json(weetResponse(weet));
  } catch (error) {
    return next(error);
  }
};
