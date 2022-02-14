import * as Joi from '@hapi/joi';

export default Joi.object({
  API_TITLE: Joi.string().required(),
  API_DESCRIPTION: Joi.string().required(),
  API_VERSION: Joi.string().default('1.0'),
  API_PORT: Joi.number().default(3000),
  DATABASE_URI: Joi.string().required(),
});
