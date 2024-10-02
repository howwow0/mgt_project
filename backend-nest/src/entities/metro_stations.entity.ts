import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Point } from 'geojson';

@Entity('metro_stations')
export class MetroStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326 })
  position: Point;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  morning_traffic: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  evening_traffic: number;

  @Column()
  capacity: number;
}
