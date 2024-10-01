import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('construction_types')
export class ConstructionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floor_area: number;
}
