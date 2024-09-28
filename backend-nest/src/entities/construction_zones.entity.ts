import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Polygon } from 'geojson';
import { ConstructionType } from './construction_types.entity'; // Импортируем сущность

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
}
