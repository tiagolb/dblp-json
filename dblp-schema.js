const Joi = require('joi');

const rawJSONSchema = Joi.object().keys({
  dblpperson: Joi.object().keys({
    name: Joi.string(),
    n: Joi.string(),
    person: Joi.object().required(),
    r: Joi.array().required(),
    coauthors: Joi.object().required(),
  }).required()
});

const validDBLPSchema = function(rawJSON) {
    const validation = Joi.validate(rawJSON, rawJSONSchema);

    return validation.error === null;
};

module.exports = validDBLPSchema;