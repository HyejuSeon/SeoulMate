import 'dotenv/config';

export const local: object = {
  dialect: 'mysql',
  host: process.env.LOCAL_HOSTNAME,
  port: 3306,
  username: process.env.LOCAL_USERNAME,
  password: process.env.LOCAL_PASSWORD,
  database: process.env.LOCAL_DB_NAME,
};

export const rds: object = {
  dialect: 'mysql',
  host: process.env.RDS_HOSTNAME,
  port: 3306,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};
