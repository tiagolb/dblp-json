const Joi = require('joi');

/**
 * Generic schema that applies to several elements
 * described in dblp.dtd
 * @type {Array}
 */
const genericSchema = [
  Joi.string(),
  Joi.object().keys({
    _value: Joi.string(),
    aux: Joi.any(),
    label: Joi.any(),
    type: Joi.any(),
  }),
];

/**
 * Author schema as described by dblp.dtd
 * @type {Array}
 */
const authorSchema = [
  Joi.string(),
  Joi.object().keys({
    $value: Joi.string(),
    aux: Joi.any(),
    bibtex: Joi.any(),
    orcid: Joi.any(),
    label: Joi.any(),
    type: Joi.any(),
  }),
];

/**
 * Cite schema as described by dblp.dtd
 * @type {Array}
 */
const citeSchema = [
  Joi.string(),
  Joi.object().keys({
    $value: Joi.string(),
    // optional attributes
    aux: Joi.any(),
    label: Joi.any(),
    type: Joi.any(),
    ref: Joi.any(),
  }),
];

/**
 * Person schema as described by dblp.dtd
 * @type {Joi.object}
 */
const personSchema = Joi.object().keys({
  // required attributes
  key: Joi.string().required(),
  // optional attributes
  mdate: Joi.any(),
  cdate: Joi.any(),
  // optional fields
  author: Joi.array().items(authorSchema).single(),
  url: Joi.array().items(genericSchema).single(),
  note: Joi.array().items(genericSchema).single(),
  cite: Joi.array().items(citeSchema).single(),
  crossref: Joi.any(),
});

/**
 * R schema (not described in dblp.dtd)
 * @type {Joi.array}
 */
const rSchema = Joi.array().items(
  Joi.object().keys({
    article: Joi.object(),
    inproceedings: Joi.object(),
    proceedings: Joi.object(),
    book: Joi.object(),
    incollection: Joi.object(),
    phdthesis: Joi.object(),
    mastersthesis: Joi.object(),
    www: Joi.object(),
    person: personSchema,
    data: Joi.object(),
  }).xor(
    'article',
    'inproceedings',
    'proceedings',
    'book',
    'incollection',
    'phdthesis',
    'mastersthesis',
    'www',
    'person',
    'data',
  ).required(),
).single().required();


/**
 * Co schema (not described in dblp.dtd)
 * @type {Joi.object}
 */
const coSchema = Joi.object().keys({
  c: Joi.any(),
  n: Joi.any(),
  na: Joi.array().single().required(),
}).required();

/**
 * Coauthors schema (not described in dblp.dtd)
 * @type {Joi.object}
 */
const coauthorsSchema = Joi.object().keys({
  n: Joi.string(),
  nc: Joi.any(),
  co: Joi.array().items(coSchema).single(),
}).required();

/**
 * RawJSON schema (not completely described in dblp.dtd)
 * @type {Joi.object}
 */
const rawJSONSchema = Joi.object().keys({
  // required dblpperson object
  dblpperson: Joi.object().keys({
    // optional properties
    name: Joi.string(),
    n: Joi.string(),
    // required person property
    person: personSchema.required(),
    // irrelevant homonyms object
    homonyms: Joi.object(),
    // required r property
    r: rSchema,
    // required coauthors property
    coauthors: coauthorsSchema,
  }).required(),
});

const validDBLPSchema = rawJSON => Joi.validate(rawJSON, rawJSONSchema);

module.exports = validDBLPSchema;
