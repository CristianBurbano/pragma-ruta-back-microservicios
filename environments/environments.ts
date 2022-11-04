import * as Joi from 'joi';

export const environtments = {
  prod: 'prod.env',
  default: '.env',
};

export const schema = Joi.object({
  PORT: Joi.number().required(),

  MYSQL_DB: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_HOST: Joi.string().required(),

  MONGO_DB: Joi.string().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_HOST: Joi.string().required(),

  AWS_ACESS_KEY: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),

  TYPEORM_SYNCHRONIZE: Joi.boolean(),
  TYPEORM_LOGGING: Joi.boolean(),
  TYPEORM_ENTITIES: Joi.string(),

  TYPEORM_MIGRATIONS: Joi.string(),
  TYPEORM_MIGRATIONS_DIR: Joi.string(),
  TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string(),
});
