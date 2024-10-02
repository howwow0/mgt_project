import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LineString } from 'geojson';

@Entity('roads')
export class Road {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geography', { spatialFeatureType: 'LineString', srid: 4326 })
  geometry: LineString;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  morning_traffic: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  evening_traffic: number;

  @Column()
  capacity: number;
}
