import { User } from '../users/users.entity';
export const userProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: User,
    },
];
