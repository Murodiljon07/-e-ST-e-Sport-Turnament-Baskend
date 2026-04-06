import Joi from "joi";

/** Tournament validation */
export const tournamentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    game: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    rank: Joi.string()
      .valid("E", "D", "C", "B", "A", "S", "SS", "SSS")
      .required(),
    isRanked: Joi.boolean().default(false),
    maxParticipants: Joi.number().required(),
    participants: Joi.array().items(Joi.string()), // array of user IDs
    matches: Joi.array().items(Joi.string()), // array of match IDs
  });

  return schema.validate(data);
};
