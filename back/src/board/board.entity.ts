import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Boards {
    @PrimaryColumn()
    board_id: string;

    @Column()
    user_id: string;

    @Column()
    title: string;

    @Column()
    restaurant: string;

    @Column()
    content: string;

    @Column()
    landmark_img: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.board, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: Users;
}
