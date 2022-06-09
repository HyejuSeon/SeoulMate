import { DataSource } from 'typeorm';
import { Landmark } from './landmarks.entity';
export const landmarkProviders = [
    {
        provide: 'LANDMARKS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Landmark),
        inject: ['DATA_SOURCE'],
    },
];
