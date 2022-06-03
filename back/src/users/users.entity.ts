import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ description: 'user id' })
    user_id: string;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    profile_image: string;

    @Column()
    @ApiProperty()
    rank: number;

    @Column()
    @ApiProperty()
    exp: number;
}
