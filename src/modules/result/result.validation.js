import Joi from "joi";

/** Result validation */
export const resultValidation = (data) => {
  const schema = Joi.object({
    player: Joi.string(), // user ID
    team: Joi.string(), // team ID
    tournament: Joi.string(), // tournament ID
    match: Joi.string(), // match ID
    points: Joi.number().required(),
    rank: Joi.string().valid("E", "D", "C", "B", "A", "S", "SS", "SSS"),
    note: Joi.string().allow(""),
  });

  return schema.validate(data);
};
