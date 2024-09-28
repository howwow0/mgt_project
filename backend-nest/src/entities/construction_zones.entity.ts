import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Polygon } from 'geojson';
import { ConstructionType } from './construction_types.entity';
import { ZoneMetroTraffic } from './zone_metro_traffic.entity';
import { ZoneRoadTraffic } from './zone_road_traffic.entity';
@Entity('construction_zones')
export class ConstructionZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'geography', spatialFeatureType: 'Polygon', srid: 4326 })
  area: Polygon;

  @ManyToOne(() => ConstructionType) // Связь многие к одному
  @JoinColumn({ name: 'construction_type_id' }) // Указываем внешний ключ
  constructionType: ConstructionType; // Связь с типом строительства

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  zone_area: number;

  @OneToMany(
    () => ZoneMetroTraffic,
    (zoneMetroTraffic) => zoneMetroTraffic.zone,
  )
  zoneMetroTraffic: ZoneMetroTraffic[];

  @OneToMany(() => ZoneRoadTraffic, (zoneRoadTraffic) => zoneRoadTraffic.zone)
  zoneRoadTraffic: ZoneRoadTraffic[];
}
