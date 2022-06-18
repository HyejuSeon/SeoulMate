import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    RelationId,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Boards extends BaseEntity {
    @PrimaryColumn()
    board_id: string;

    // @Column()
    // user_id: string;

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

    @ManyToOne(() => Users, (user) => user.user_id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    user_id: Users;

    @Column()
    @RelationId((board: Boards) => board.user_id)
    userId: string;
}
