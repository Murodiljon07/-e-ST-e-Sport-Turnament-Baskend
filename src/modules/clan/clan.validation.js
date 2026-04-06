import Joi from "joi";

/** Clan validation */
export const clanValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().allow(""),
    leader: Joi.string().required(),
    members: Joi.array().items(Joi.string()).default([]),
    game: Joi.array().items(Joi.string()).required(), // e.g., ["pubg","csgo"]
    privacy: Joi.string().valid("public", "private").default("public"),
    description: Joi.string().allow(""),
  });

  return schema.validate(data);
};
