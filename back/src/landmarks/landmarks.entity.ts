import { Visited } from 'src/visited/visited.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Landmark {
    @PrimaryColumn()
    landmark_id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column()
    add: string;

    @Column()
    location: string;

    @Column()
    location_sub: string;

    @Column({ nullable: true })
    longitude: string;

    @Column({ nullable: true })
    latitude: string;

    @OneToMany(() => Visited, (visited) => visited.landmark)
    visited: Visited[];
}
