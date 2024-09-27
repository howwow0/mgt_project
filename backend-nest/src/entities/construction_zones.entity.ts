import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Polygon } from 'geojson';

@Entity('construction_zones')
export class ConstructionZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'geography', spatialFeatureType: 'Polygon', srid: 4326 })
  area: Polygon;

  @Column({ type: 'integer' })
  construction_type_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  zone_area: number;
}
