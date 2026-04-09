import Joi from "joi";

/** User update validation */
export const userUpdateValidation = (data) => {
  const schema = Joi.object({
    avatar: Joi.string(),
    fullName: Joi.string(),
    nickname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    country: Joi.string(),
    games: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        playerId: Joi.string().required(),
      }),
    ),
  });

  return schema.validate(data);
};
