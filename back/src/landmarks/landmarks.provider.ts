import { Landmark } from './landmarks.entity';
export const landmarkProviders = [
    {
        provide: 'LANDMARKS_REPOSITORY',
        useValue: Landmark,
    },
];
