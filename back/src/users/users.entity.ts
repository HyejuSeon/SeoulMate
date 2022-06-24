import { Exclude } from 'class-transformer';
import { Boards } from 'src/board/board.entity';
import { Comments } from 'src/comment/comment.entity';
import { Visited } from 'src/visited/visited.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
    @PrimaryColumn()
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
    rating: number;

    @Column({
        default: 0,
    })
    exp: number;

    @Column({ nullable: true })
    @Exclude() // 민감한 데이터는 응답에서 제외 가능
    hashedRefreshToken?: string;

    @OneToMany(() => Visited, (visited) => visited.user)
    visited: Visited[];

    @OneToMany(() => Boards, (board) => board.user_id, {
        cascade: true,
    })
    public board: Boards[];

    @OneToMany(() => Comments, (comment) => comment.user_id, {
        cascade: true,
    })
    public comment: Comments[];
}
