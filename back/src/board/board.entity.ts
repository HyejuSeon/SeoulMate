import { Comments } from 'src/comment/comment.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Boards extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    board_id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    landmark_img_id: string;

    @Column()
    landmark_name: string;

    @Column()
    location: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.board, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    public user_id: string;

    @OneToMany(() => Comments, (comment) => comment.board_id, {
        cascade: true,
    })
    public comment: Comments[];
}
