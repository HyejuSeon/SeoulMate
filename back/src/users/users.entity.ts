import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @PrimaryKey
    @Column
    user_id: string;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    profile_image: string;

    @Column
    rank: number;

    @Column
    exp: number;
}
