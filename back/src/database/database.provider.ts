import { DataSource } from 'typeorm';
import { typeormLocal } from 'typeormconfig';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource(typeormLocal);
            return dataSource.initialize();
        },
    },
];
