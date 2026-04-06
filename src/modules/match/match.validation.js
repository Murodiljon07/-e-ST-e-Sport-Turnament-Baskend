import Joi from "joi";

/** Match validation */
export const matchValidation = (data) => {
  const schema = Joi.object({
    tournament: Joi.string().required(), // tournament ID
    round: Joi.number().required(),
    map: Joi.string().allow(""),
    participants: Joi.array().items(Joi.string()).default([]), // participant IDs
    scores: Joi.array()
      .items(
        Joi.object({
          participant: Joi.string(),
          points: Joi.number().default(0),
          rank: Joi.string()
            .valid("E", "D", "C", "B", "A", "S", "SS", "SSS")
            .allow(null),
        }),
      )
      .default([]),
    status: Joi.string()
      .valid("pending", "ongoing", "completed")
      .default("pending"),
    startTime: Joi.date().allow(null),
    endTime: Joi.date().allow(null),
  });

  return schema.validate(data);
};
