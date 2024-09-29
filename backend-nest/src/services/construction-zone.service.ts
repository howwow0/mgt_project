import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { Repository } from 'typeorm';
//import { TrafficUtils } from '../utils/TrafficUtils'; // Импортируем утилитарный класс

@Injectable()
export class ConstructionZoneService {
  constructor(
    @InjectRepository(ConstructionZone)
    private readonly constructionZoneRepository: Repository<ConstructionZone>,
  ) {}

  async findAll(): Promise<any[]> {
    const zones = await this.constructionZoneRepository.find({
      relations: [
        'zoneMetroTraffic.metro_station', // Получение данных о метро
        'zoneRoadTraffic.road', // Получение данных о дорогах
        'constructionZoneArea.construction_type', // Получение данных о типах строительства
      ],
    });

    return zones.map((zone) => ({
      ...zone,
      zoneMetroTraffic: zone.zoneMetroTraffic.map((metro) => {
        return {
          ...metro,
          new_traffic: (function () {
            // Логика расчета трафика

            return (
              Number(metro.metro_station.morning_traffic) +
              Number(metro.metro_station.evening_traffic)
            );
            // Пример
          })(),
          is_effective: (function () {
            // Логика проверки эффективности
            return (
              metro.metro_station.evening_traffic >
              metro.metro_station.morning_traffic
            ); // Пример
          })(),
        };
      }),
      zoneRoadTraffic: zone.zoneRoadTraffic.map((road) => {
        return {
          ...road,
          new_traffic: (function () {
            // Логика расчета трафика
            return (
              Number(road.road.morning_traffic) +
              Number(road.road.evening_traffic)
            ); // Пример
          })(),
          is_effective: (function () {
            // Логика проверки эффективности
            return road.road.evening_traffic > road.road.morning_traffic; // Пример
          })(),
        };
      }),
    }));
  }
}
