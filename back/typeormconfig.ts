import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import * as config from 'config';

const dbConfig = config.get('elice'); // db config
// config.get('db.host') 와 같은 방식으로 접근 가능
// dbConfig.host는 안된다

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
    type: dbConfig['type'],
    host: dbConfig['host'],
    port: dbConfig['port'],
    username: dbConfig['username'],
    password: dbConfig['password'],
    database: dbConfig['database'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};
