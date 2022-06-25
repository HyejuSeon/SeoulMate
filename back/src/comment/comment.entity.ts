import { Boards } from 'src/board/board.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    comment_id: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.comment, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    @Column()
    public user_id: string;

    @ManyToOne(() => Boards, (board) => board.comment, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'board_id' })
    @Column()
    public board_id: string;
}
