import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Polygon } from 'geojson';
import { ZoneMetroTraffic } from './zone_metro_traffic.entity';
import { ZoneRoadTraffic } from './zone_road_traffic.entity';
import { ConstructionZoneArea } from './construction_zone_area.entity';

@Entity('construction_zones')
export class ConstructionZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geography', { spatialFeatureType: 'Polygon', srid: 4326 })
  area: Polygon;

  @OneToMany(() => ZoneMetroTraffic, (metroTraffic) => metroTraffic.zone)
  zoneMetroTraffic: ZoneMetroTraffic[];

  @OneToMany(() => ZoneRoadTraffic, (roadTraffic) => roadTraffic.zone)
  zoneRoadTraffic: ZoneRoadTraffic[];

  @OneToMany(() => ConstructionZoneArea, (zoneArea) => zoneArea.zone)
  constructionZoneArea: ConstructionZoneArea[];
}
