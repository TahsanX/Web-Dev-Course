import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 3000,
  pg_host: process.env.POSTGRE_HOST,
  pg_port: process.env.POSTGRE_PORT,
  pg_database: process.env.POSTGRE_DATABASE,
  pg_user: process.env.POSTGRE_USER,
  pg_password: process.env.POSTGRE_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};