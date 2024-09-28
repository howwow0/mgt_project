import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Road } from './roads.entity';
import { ConstructionZone } from './construction_zones.entity';

@Entity('zone_road_traffic')
export class ZoneRoadTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConstructionZone, (zone) => zone.id)
  @JoinColumn({ name: 'zone_id' })
  zone: ConstructionZone;

  @ManyToOne(() => Road, (road) => road.id)
  @JoinColumn({ name: 'road_id' })
  road: Road;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  new_traffic: number;

  @Column({ type: 'boolean', nullable: true })
  is_defective: boolean;
}
