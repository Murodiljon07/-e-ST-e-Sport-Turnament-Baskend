import Joi from "joi";

/** Tournament validation */
export const tournamentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    game: Joi.string().required(),
    type: Joi.string().valid("solo", "team", "duo", "squad").required(),
    startDate: Joi.date().required(),
    endDate: Joi.string(),
    description: Joi.string().required(),
    rankRestriction: Joi.string()
      .valid("E", "D", "C", "B", "A", "S", "SS", "SSS")
      .required(),
    isRanked: Joi.boolean().default(false),
    maxParticipants: Joi.number().required(),
    participants: Joi.array().items(Joi.string()), // array of user IDs
    matches: Joi.array().items(Joi.string()), // array of match IDs
  });

  return schema.validate(data);
};
