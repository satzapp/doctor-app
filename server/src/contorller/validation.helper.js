const joi = require("joi");

module.exports = {
  validatLogin: (req) => {
    let schema = joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    return schema.validate(req, { abortEarly: false }).error;
  },

  validatRegistration: (req) => {
    let emailReg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let schema = joi.object().keys({
      email: joi
        .string()
        .required()
        .regex(emailReg)
        .options({
          language: {
            string: {
              required: "{{label}} field is required",
              regex: {
                base: "Invalid {{label}} address.",
              },
            },
          },
        })
        .label("email"),
      password: joi.string().required(),
      name: joi.string().required(),
      mobile: joi.number().required(),
      role: joi.string().optional(),
    });

    return schema.validate(req, { abortEarly: false }).error;
  },

  validatBooking: (req) => {
    let schema = joi.object().keys({
      patientName: joi.string().required(),
      age: joi.number().required(),
      mobile: joi.string().required(),
      gender: joi.string().optional(),
      date: joi.string().required(),
      fromTime: joi.string().required(),
      toTime: joi.string().required(),
      status: joi.optional(),
    });

    return schema.validate(req, { abortEarly: false }).error;
  },

  errorFormat: (error) => {
    var errors = {};
    if (error) {
      error.details.forEach((detail) => {
        errors[detail.path] = detail.message.replace(/['"]+/g, "");
      });
    }
    return errors;
  },

  messageFormat: (message, code = 200, errors = false, type = "users") => {
    return {
      code: code,
      errors: errors,
      type: type,
      attributes: message,
    };
  },
};
