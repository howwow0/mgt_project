import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('construction_types')
export class ConstructionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  floor_area: number;
}
