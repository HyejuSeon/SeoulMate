import { DataSource } from 'typeorm';
import { typeormGCP, typeormLocal } from 'typeormconfig';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource(typeormLocal);
            return dataSource.initialize();
        },
    },
];
