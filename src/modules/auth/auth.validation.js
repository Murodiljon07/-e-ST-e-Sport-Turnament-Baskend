import Joi from "joi";

/** Register validation */
export const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    nickname: Joi.string().optional(),
    age: Joi.number().min(16).required(),
    country: Joi.string().required(),
    mainGame: Joi.string().required(),
    games: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          playerId: Joi.string().required(),
        }),
      )
      .required(),
  });
  return schema.validate(data);
};

/** Login validation */
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
