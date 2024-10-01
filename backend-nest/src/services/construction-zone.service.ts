import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { Repository, DataSource } from 'typeorm';
import { TrafficUtils } from '../utils/TrafficUtils';
import { MetroStation } from '../entities/metro_stations.entity';
import { Road } from '../entities/roads.entity';
import { ConstructionZoneArea } from '../entities/construction_zone_area.entity';
import { CreateConstructionZoneDto } from '../dto/create-construction-zone.dto';
import { ConstructionType } from '../entities/construction_types.entity';
import { ZoneMetroTraffic } from '../entities/zone_metro_traffic.entity';
import { ZoneRoadTraffic } from '../entities/zone_road_traffic.entity';

@Injectable()
export class ConstructionZoneService {
  constructor(
    @InjectRepository(ConstructionZone)
    private readonly constructionZoneRepository: Repository<ConstructionZone>,
    @InjectRepository(MetroStation)
    private readonly metroStationRepository: Repository<MetroStation>,
    @InjectRepository(Road)
    private readonly roadRepository: Repository<Road>,
    @InjectRepository(ConstructionZoneArea)
    private readonly zoneAreaRepository: Repository<ConstructionZoneArea>,
    private readonly dataSource: DataSource,
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
      // Количество рабочих проживающих на объекте
      const livingPeoples = TrafficUtils.countCitizen(
        zone.constructionZoneArea,
      );
      // Количество свободных рабочих мест
      const outWorkers = TrafficUtils.countWorkPlace(
        zone.constructionZoneArea,
        livingPeoples,
      );
      // Нагрузка на метро, созданная из-за объекта
      const metroLoad = TrafficUtils.calcLoad(livingPeoples, outWorkers, true);
      // Нагрузка на дорогу, созданная из-за объекта
      const roadLoad = TrafficUtils.calcLoad(livingPeoples, outWorkers, false);
      // Суммарная изначальная нагрузка на метро утром
      const morningCountTrafficMetro = TrafficUtils.sumTrafficMetro(
        zone.zoneMetroTraffic,
        true,
      );
      // Суммарная изначальная нагрузка на метро вечером
      const eveningCountTrafficMetro = TrafficUtils.sumTrafficMetro(
        zone.zoneMetroTraffic,
        false,
      );
      // Суммарная изначальная нагрузка на дорогу утром
      const morningCountTrafficRoad = TrafficUtils.sumTrafficRoad(
        zone.zoneRoadTraffic,
        true,
      );
      // Суммарная изначальная нагрузка на дорогу вечером
      const eveningCountTrafficRoad = TrafficUtils.sumTrafficRoad(
        zone.zoneRoadTraffic,
        false,
      );
      // Установка новой нагрузки для каждого метро
      zone.zoneMetroTraffic.forEach((metro) => {
        // Установка утреннего значения
        metro.new_traffic_morning = TrafficUtils.calcTraffic(
          metroLoad,
          metro.metro_station.morning_traffic,
          morningCountTrafficMetro,
        );
        // Установка вечернего значения
        metro.new_traffic_evening = TrafficUtils.calcTraffic(
          metroLoad,
          metro.metro_station.evening_traffic,
          eveningCountTrafficMetro,
        );
        // Проверка на дифицит утром
        metro.is_deficit_morning =
          metro.metro_station.capacity < metro.new_traffic_morning;
        // Проверка на дифицит вечером
        metro.is_deficit_evening =
          metro.metro_station.capacity < metro.new_traffic_evening;
      });
      // Установка новой нагрузки для каждой дороги
      zone.zoneRoadTraffic.forEach((road) => {
        // Установка утреннего значения
        road.new_traffic_morning = TrafficUtils.calcTraffic(
          roadLoad,
          road.road.morning_traffic,
          morningCountTrafficRoad,
        );
        // Установка вечернего значения
        road.new_traffic_evening = TrafficUtils.calcTraffic(
          roadLoad,
          road.road.evening_traffic,
          eveningCountTrafficRoad,
        );
        // Проверка на дифицит утром
        road.is_deficit_morning = road.road.capacity < road.new_traffic_morning;
        // Проверка на дифицит вечером
        road.is_deficit_evening = road.road.capacity < road.new_traffic_evening;
      });
      return zone;
    });
    return newZones;
  }

  async create(
    createConstructionZoneDto: CreateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const constructionZone = new ConstructionZone();
      constructionZone.name = createConstructionZoneDto.name;
      constructionZone.area = createConstructionZoneDto.area;

      // Сохраняем зону строительства
      const savedZone = await queryRunner.manager.save(constructionZone);

      // Создаем и сохраняем объект ConstructionZoneArea
      const constructionZoneArea = new ConstructionZoneArea();
      constructionZoneArea.zone_area =
        createConstructionZoneDto.zoneArea.zone_area;
      constructionZoneArea.construction_type =
        await queryRunner.manager.findOne(ConstructionType, {
          where: {
            id: createConstructionZoneDto.zoneArea.construction_type_id,
          }, // Используем ID
        });

      constructionZoneArea.zone = savedZone; // Связываем зону строительства

      await queryRunner.manager.save(constructionZoneArea); // Сохраняем объект зоны
      // Create road and link it
      const road = this.roadRepository.create(createConstructionZoneDto.road);
      await queryRunner.manager.save(road);
      const zoneRoadTraffic = new ZoneRoadTraffic();
      zoneRoadTraffic.zone = savedZone; // Associate with construction zone
      zoneRoadTraffic.road = road; // Associate with the road
      await queryRunner.manager.save(zoneRoadTraffic); // Save the relation
      // Сохранение метро (если есть)
      if (createConstructionZoneDto.metroStations) {
        for (const metroDto of createConstructionZoneDto.metroStations) {
          const metroStation = new MetroStation();
          metroStation.name = metroDto.name;
          metroStation.position = metroDto.position;
          metroStation.morning_traffic = metroDto.morning_traffic;
          metroStation.evening_traffic = metroDto.evening_traffic;
          metroStation.capacity = metroDto.capacity;

          const savedMetroStation =
            await queryRunner.manager.save(metroStation);

          const zoneMetroTraffic = new ZoneMetroTraffic();
          zoneMetroTraffic.zone = savedZone; // Associate with construction zone
          zoneMetroTraffic.metro_station = savedMetroStation; // Associate with metro station
          await queryRunner.manager.save(zoneMetroTraffic); // Save the relation
        }
      }

      await queryRunner.commitTransaction();
      return savedZone;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error; // Обработка ошибок
    } finally {
      await queryRunner.release();
    }
  }
}
