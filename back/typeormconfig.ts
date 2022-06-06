import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const typeormLocal: DataSourceOptions = {
    type: 'mysql',
    host: process.env.LOCAL_HOSTNAME,
    port: 3306,
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};

export const typeormGCP: DataSourceOptions = {
    type: 'mysql',
    host: process.env.GCP_HOSTNAME,
    port: 3306,
    username: process.env.GCP_USERNAME,
    password: process.env.GCP_PASSWORD,
    database: process.env.GCP_DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};
