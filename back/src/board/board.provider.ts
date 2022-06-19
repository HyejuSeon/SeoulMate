import { DataSource } from 'typeorm';
import { Boards } from './board.entity';

export const boardProviders = [
    {
        provide: 'BOARDS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Boards),
        inject: ['DATA_SOURCE'],
    },
];
