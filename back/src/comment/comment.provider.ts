import { DataSource } from 'typeorm';
import { Comments } from './comment.entity';
export const commentProviders = [
    {
        provide: 'COMMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Comments),
        inject: ['DATA_SOURCE'],
    },
];
