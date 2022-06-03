import { Sequelize } from 'sequelize-typescript';
import { local } from 'typeormconfig';
import { User } from '../users/users.entity';

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(local);
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
