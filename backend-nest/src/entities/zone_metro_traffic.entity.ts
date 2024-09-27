import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zone_metro_traffic')
export class ZoneMetroTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  zone_id: number;

  @Column({ type: 'integer' })
  metro_station_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  new_traffic: number;

  @Column({ type: 'boolean', nullable: true })
  is_defective: boolean;
}
