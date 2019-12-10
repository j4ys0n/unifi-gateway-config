require('dotenv').config();

export const environment = {
  TEST: (process.env.ENV === 'test'),
  DEV: (process.env.ENV === 'dev'),
  PROD: (process.env.ENV === 'prod'),
  ENV: process.env.ENV,
  API_PORT: process.env.API_PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  PAYLOAD_LIMIT: process.env.PAYLOAD_LIMIT,
  FRONT_END_ROUTE: process.env.FRONT_END_ROUTE,
  FRONT_END_PATH: process.env.FRONT_END_PATH
}
