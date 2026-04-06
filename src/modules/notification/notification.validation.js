import Joi from "joi";

/** Notification validation */
export const notificationValidation = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(), // user ID
    title: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string()
      .valid("info", "warning", "success", "error")
      .default("info"),
    meta: Joi.object().default({}),
    read: Joi.boolean().default(false),
  });

  return schema.validate(data);
};
