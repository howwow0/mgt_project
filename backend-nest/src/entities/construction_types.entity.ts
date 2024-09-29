import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('construction_types')
@Unique(['name'])
export class ConstructionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floor_area: number;
}
