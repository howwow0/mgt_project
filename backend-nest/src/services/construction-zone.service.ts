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

    const newZones = zones.map((zone) => ({
      ...zone,
      zoneMetroTraffic: zone.zoneMetroTraffic.map((metro) => {
        return {
          ...metro,
          new_traffic_morning: 0,
          new_traffic_evening: 0,
          is_deficit_morning: false,
          is_deficit_evening: false,
        };
      }),
      zoneRoadTraffic: zone.zoneRoadTraffic.map((road) => {
        return {
          ...road,
          new_traffic_morning: 0,
          new_traffic_evening: 0,
          is_deficit_morning: false,
          is_deficit_evening: false,
        };
      }),
    }));

    newZones.forEach((zone) => {
      const zoneAreaForLivingPeople = zone.constructionZoneArea.filter(
        (pa) => pa.construction_type.floor_area != 35,
      );

      const livingPeoples = zoneAreaForLivingPeople.reduce((p, c) => {
        return p + (c.zone_area / c.construction_type.floor_area) * 0.57;
      }, 0); //Люди живущие в домах

      const zoneAreaForNotLivingPeople = zones.flatMap((p) => {
        return p.constructionZoneArea.filter(
          (pa) => pa.construction_type.floor_area == 35,
        );
      });

      const notLivingPeoples = zoneAreaForNotLivingPeople.reduce((p, c) => {
        return p + c.zone_area / c.construction_type.floor_area;
      }, 0);

      console.log(livingPeoples);
      console.log(notLivingPeoples);

      const outWorkers = notLivingPeoples - livingPeoples * 0.2;

      console.log(outWorkers);

      const metroLoad = (livingPeoples * 0.8 * 0.7 + outWorkers * 0.7) / 1000;

      console.log(metroLoad);

      const roadLoad = (livingPeoples * 0.8 * 0.3 + outWorkers * 0.3) / 1.2;

      console.log(roadLoad);

      const morningCountTrafficMetro = zone.zoneMetroTraffic.reduce(
        (c, p) => c + Number(p.metro_station.morning_traffic),
        0,
      );

      const eveningCountTrafficMetro = zone.zoneMetroTraffic.reduce(
        (c, p) => c + Number(p.metro_station.evening_traffic),
        0,
      );

      const morningCountTrafficRoad = zone.zoneRoadTraffic.reduce(
        (c, p) => c + Number(p.road.morning_traffic),
        0,
      );

      const eveningCountTrafficRoad = zone.zoneRoadTraffic.reduce(
        (c, p) => c + Number(p.road.evening_traffic),
        0,
      );

      console.log(morningCountTrafficMetro);
      console.log(eveningCountTrafficMetro);
      console.log(morningCountTrafficRoad);
      console.log(eveningCountTrafficRoad);

      zone.zoneMetroTraffic.forEach((metro) => {
        metro.new_traffic_morning =
          (metroLoad * metro.metro_station.morning_traffic) /
            morningCountTrafficMetro +
          Number(metro.metro_station.morning_traffic);

        metro.new_traffic_evening =
          (metroLoad * metro.metro_station.evening_traffic) /
            eveningCountTrafficMetro +
          Number(metro.metro_station.evening_traffic);

        metro.is_deficit_morning =
          metro.metro_station.capacity < metro.new_traffic_morning;

        metro.is_deficit_evening =
          metro.metro_station.capacity < metro.new_traffic_evening;
      });

      zone.zoneRoadTraffic.forEach((road) => {
        road.new_traffic_morning =
          (roadLoad * road.road.morning_traffic) / morningCountTrafficRoad +
          Number(road.road.morning_traffic);

        road.new_traffic_evening =
          (roadLoad * road.road.evening_traffic) / eveningCountTrafficRoad +
          Number(road.road.evening_traffic);

        road.is_deficit_morning = road.road.capacity < road.new_traffic_morning;

        road.is_deficit_evening = road.road.capacity < road.new_traffic_evening;
      });
      return zone;
    });
    return newZones;
  }
}
