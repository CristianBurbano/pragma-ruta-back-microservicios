import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mysql: {
    name: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
  },
  mongo: {
    name: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
  },
  aws: {
    key: process.env.AWS_ACESS_KEY,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
}));
