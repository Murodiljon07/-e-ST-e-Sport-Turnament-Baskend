import Joi from "joi";

/** Register validation */
export const registerValidation = (data) => {
  const schema = Joi.object({
    avatar: Joi.string().optional(),
    fullName: Joi.string().required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().min(16).required(),
    country: Joi.string().required(),
    mainGame: Joi.object({
      game: Joi.string().required(),
      playerId: Joi.string().required(),
    }).required(),
    games: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          playerId: Joi.string().required(),
        }),
      )
      .optional(),
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
