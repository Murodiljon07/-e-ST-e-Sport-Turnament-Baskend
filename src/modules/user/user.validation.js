import Joi from "joi";

/** User update validation */
export const userUpdateValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string(),
    age: Joi.number().min(16),
    country: Joi.string(),
    email: Joi.string().email(),
    games: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        playerId: Joi.string().required(),
      }),
    ),
    clanRole: Joi.string().valid("leader", "elder", "member"),
    trustScore: Joi.number().min(0).max(100),
  });

  return schema.validate(data);
};
