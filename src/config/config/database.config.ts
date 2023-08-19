import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    db: process.env.DATABASE_DEFAULT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };
});
