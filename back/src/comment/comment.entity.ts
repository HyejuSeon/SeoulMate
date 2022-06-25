import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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
    @JoinColumn({ name: 'user_id' })
    public user_id: string;
}
