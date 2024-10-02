import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConstructionZone } from './construction_zones.entity';
import { MetroStation } from './metro_stations.entity';

@Entity('zone_metro_traffic')
export class ZoneMetroTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConstructionZone, (zone) => zone.id)
  @JoinColumn({ name: 'zone_id' }) // Явное указание имени столбца внешнего ключа
  zone: ConstructionZone;

  @ManyToOne(() => MetroStation, (station) => station.id)
  @JoinColumn({ name: 'metro_station_id' }) // Явное указание имени столбца внешнего ключа
  metro_station: MetroStation;
}
