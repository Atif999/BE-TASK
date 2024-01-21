const Joi = require("joi");

const validateCreateProduct = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.number().integer().min(1).required(),
    productName: Joi.string().min(3).max(30).required(),
    cost: Joi.number().integer().min(0).required(),
    amountAvailable: Joi.number().integer().min(0).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

const validateUpdateProduct = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.number().integer().min(1).required(),
    productName: Joi.string().min(3).max(30).required(),
    cost: Joi.number().integer().min(0).required(),
    amountAvailable: Joi.number().integer().min(0).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

const validateDeleteProduct = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.number().integer().min(1).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
};
