import Joi from "joi";

/** Team validation */
export const teamValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().allow(""),
    isPrivate: Joi.boolean().default(false),
    game: Joi.string().required(),
    members: Joi.array().items(Joi.string()), // user IDs
    rank: Joi.string().valid("E", "D", "C", "B", "A", "S", "SS", "SSS"),
    temporary: Joi.boolean().default(false),
  });

  return schema.validate(data);
};
