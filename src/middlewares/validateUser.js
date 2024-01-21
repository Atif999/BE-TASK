const Joi = require("joi");

const validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    deposit: Joi.number().min(0),
    role: Joi.string().valid("seller", "buyer").required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    deposit: Joi.number().min(0).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  }

  next();
};

module.exports = { validateCreateUser, validateUpdateUser, validateLogin };
