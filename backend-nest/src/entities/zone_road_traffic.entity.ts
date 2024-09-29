import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConstructionZone } from './construction_zones.entity';
import { Road } from './roads.entity';

@Entity('zone_road_traffic')
export class ZoneRoadTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConstructionZone, (zone) => zone.id)
  @JoinColumn({ name: 'zone_id' }) // Явное указание имени столбца внешнего ключа
  zone: ConstructionZone;

  @ManyToOne(() => Road, (road) => road.id)
  @JoinColumn({ name: 'road_id' }) // Явное указание имени столбца внешнего ключа
  road: Road;
}
