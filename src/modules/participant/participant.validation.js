import Joi from "joi";

/** Participant validation */
export const participantValidation = (data) => {
  const schema = Joi.object({
    player: Joi.string().required(), // user ID
    team: Joi.string().allow(null), // optional team ID
    tournament: Joi.string().required(), // tournament ID
    status: Joi.string()
      .valid("pending", "accepted", "rejected")
      .default("pending"),
    pointsEarned: Joi.number().default(0),
    rankAchieved: Joi.string()
      .valid("E", "D", "C", "B", "A", "S", "SS", "SSS")
      .allow(null),
    notes: Joi.string().allow(""),
  });

  return schema.validate(data);
};
