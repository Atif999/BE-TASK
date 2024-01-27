const Joi = require("joi");

const validateDeposit = (req, res, next) => {
  const schema = Joi.object({
    coins: Joi.number().valid(5, 10, 20, 50, 100).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};
const validateBuy = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    amount: Joi.number().integer().min(1).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

module.exports = { validateDeposit, validateBuy };
