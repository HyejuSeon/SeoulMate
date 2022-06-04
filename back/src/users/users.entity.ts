import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: 'profile image url',
    })
    profile_image: string;

    @Column({
        default: 0,
    })
    rank: number;

    @Column({
        default: 0,
    })
    exp: number;
}
