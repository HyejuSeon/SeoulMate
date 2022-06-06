import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Landmark {
    @PrimaryColumn()
    landmark_id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column({ type: 'longtext' })
    description: string;

    @Column()
    add: string;

    @Column()
    location: string;

    @Column()
    location_sub: string;
}
