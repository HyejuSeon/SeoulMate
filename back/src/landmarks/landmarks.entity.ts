import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  landmark_id: string;

  @Column()
  name: string;

  @Column()
  supercategory: string;

  @Column()
  description: string;

  @Column()
  add: string;

  @Column()
  location: string;

  @Column()
  location_sub: string;
}
