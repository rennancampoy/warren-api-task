import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  title: process.env.API_TITLE,
  description: process.env.API_DESCRIPTION,
  version: process.env.API_VERSION,
  port: process.env.API_PORT,
}));
