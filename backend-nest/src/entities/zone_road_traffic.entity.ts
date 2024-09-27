import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zone_road_traffic')
export class ZoneRoadTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  zone_id: number;

  @Column({ type: 'integer' })
  road_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  new_traffic: number;

  @Column({ type: 'boolean', nullable: true })
  is_defective: boolean;
}
