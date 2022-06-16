import { DataSource } from 'typeorm';
import { Visited } from './visited.entity';
export const visitedProviders = [
    {
        provide: 'VISITED_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Visited),
        inject: ['DATA_SOURCE'],
    },
];
