const weetService = require('../services/weet');
const errors = require('../errors');

exports.verifyWeet = joke => joke.length <= process.env.MAXIMUM_CHARACTERS;

exports.searchWeet = async (req, _, next) => {
  try {
    const numberOfAttempts = 5;
    for (let i = 0; i < numberOfAttempts; i++) {
      const { joke } = await weetService.getGeekPhrase();
      if (this.verifyWeet(joke)) {
        req.body = {
          ...req.body,
          content: joke
        };
        return next();
      }
    }
    return next(errors.apiError('Weet api error'));
  } catch (error) {
    return next(error);
  }
};
