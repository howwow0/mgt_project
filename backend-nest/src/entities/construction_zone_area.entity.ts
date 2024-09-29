import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ConstructionZone } from './construction_zones.entity';
import { ConstructionType } from './construction_types.entity';

@Entity('construction_zone_areas')
export class ConstructionZoneArea {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConstructionZone, (zone) => zone.id)
  @JoinColumn({ name: 'zone_id' }) // Явное указание имени столбца внешнего ключа
  zone: ConstructionZone;

  @ManyToOne(() => ConstructionType, (type) => type.id)
  @JoinColumn({ name: 'construction_type_id' }) // Явное указание имени столбца внешнего ключа
  construction_type: ConstructionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  zone_area: number;
}
