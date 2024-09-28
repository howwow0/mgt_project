import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MetroStation } from './metro_stations.entity';
import { ConstructionZone } from './construction_zones.entity';

@Entity('zone_metro_traffic')
export class ZoneMetroTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConstructionZone, (zone) => zone.zoneMetroTraffic)
  @JoinColumn({ name: 'zone_id' })
  zone: ConstructionZone;

  @ManyToOne(() => MetroStation, (metroStation) => metroStation.id)
  @JoinColumn({ name: 'metro_station_id' })
  metro_station: MetroStation;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  new_traffic: number;

  @Column({ type: 'boolean', nullable: true })
  is_defective: boolean;
}
