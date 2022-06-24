import { Boards } from 'src/board/board.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Comments extends BaseEntity {
    @PrimaryColumn()
    comment_id: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.comment, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    public user_id: string;

    @ManyToOne(() => Boards, (board) => board.comment, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    public board_id: string;
}
