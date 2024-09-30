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
      /*const zoneAreaForLivingPeople = zone.constructionZoneArea.filter(
        (pa) => pa.construction_type.floor_area != 35,
      );

      const livingPeoples = zoneAreaForLivingPeople.reduce((p, c) => {
        return p + (c.zone_area / c.construction_type.floor_area) * 0.57;
      }, 0); //Люди живущие в домах*/

      const livingPeoples = TrafficUtils.countCitizen(
        zone.constructionZoneArea,
      );

      /*const zoneAreaForNotLivingPeople = zones.flatMap((p) => {
        return p.constructionZoneArea.filter(
          (pa) => pa.construction_type.floor_area == 35,
        );
      });

      const notLivingPeoples = zoneAreaForNotLivingPeople.reduce((p, c) => {
        return p + c.zone_area / c.construction_type.floor_area;
      }, 0);*/

      console.log(livingPeoples);
      //console.log(notLivingPeoples);

      //const outWorkers = notLivingPeoples - livingPeoples * 0.2;

      const outWorkers = TrafficUtils.countWorkPlace(
        zone.constructionZoneArea,
        livingPeoples,
      );

      console.log(outWorkers);

      //const metroLoad = (livingPeoples * 0.8 * 0.7 + outWorkers * 0.7) / 1000;
      const metroLoad = TrafficUtils.calcLoad(livingPeoples, outWorkers, true);

      console.log(metroLoad);

      //const roadLoad = (livingPeoples * 0.8 * 0.3 + outWorkers * 0.3) / 1.2;
      const roadLoad = TrafficUtils.calcLoad(livingPeoples, outWorkers, false);

      console.log(roadLoad);

      /*const morningCountTrafficMetro = zone.zoneMetroTraffic.reduce(
        (c, p) => c + Number(p.metro_station.morning_traffic),
        0,
      );*/
      console.log(zone.zoneMetroTraffic);
      const morningCountTrafficMetro = TrafficUtils.sumTrafficMetro(
        zone.zoneMetroTraffic,
        true,
      );

      /*const eveningCountTrafficMetro = zone.zoneMetroTraffic.reduce(
        (c, p) => c + Number(p.metro_station.evening_traffic),
        0,
      );*/
      const eveningCountTrafficMetro = TrafficUtils.sumTrafficMetro(
        zone.zoneMetroTraffic,
        false,
      );

      /*const morningCountTrafficRoad = zone.zoneRoadTraffic.reduce(
        (c, p) => c + Number(p.road.morning_traffic),
        0,
      );*/
      const morningCountTrafficRoad = TrafficUtils.sumTrafficRoad(
        zone.zoneRoadTraffic,
        true,
      );

      /*const eveningCountTrafficRoad = zone.zoneRoadTraffic.reduce(
        (c, p) => c + Number(p.road.evening_traffic),
        0,
      );*/
      const eveningCountTrafficRoad = TrafficUtils.sumTrafficRoad(
        zone.zoneRoadTraffic,
        false,
      );

      console.log(morningCountTrafficMetro);
      console.log(eveningCountTrafficMetro);
      console.log(morningCountTrafficRoad);
      console.log(eveningCountTrafficRoad);

      zone.zoneMetroTraffic.forEach((metro) => {
        /*metro.new_traffic_morning =
          (metroLoad * metro.metro_station.morning_traffic) /
            morningCountTrafficMetro +
          Number(metro.metro_station.morning_traffic);*/
        metro.new_traffic_morning = TrafficUtils.calcTraffic(
          metroLoad,
          metro.metro_station.morning_traffic,
          morningCountTrafficMetro,
        );

        /*metro.new_traffic_evening =
          (metroLoad * metro.metro_station.evening_traffic) /
            eveningCountTrafficMetro +
          Number(metro.metro_station.evening_traffic);*/
        metro.new_traffic_evening = TrafficUtils.calcTraffic(
          metroLoad,
          metro.metro_station.evening_traffic,
          eveningCountTrafficMetro,
        );

        metro.is_deficit_morning =
          metro.metro_station.capacity < metro.new_traffic_morning;

        metro.is_deficit_evening =
          metro.metro_station.capacity < metro.new_traffic_evening;
      });

      zone.zoneRoadTraffic.forEach((road) => {
        /*road.new_traffic_morning =
          (roadLoad * road.road.morning_traffic) / morningCountTrafficRoad +
          Number(road.road.morning_traffic);*/
        road.new_traffic_morning = TrafficUtils.calcTraffic(
          roadLoad,
          road.road.morning_traffic,
          morningCountTrafficRoad,
        );

        /*road.new_traffic_evening =
          (roadLoad * road.road.evening_traffic) / eveningCountTrafficRoad +
          Number(road.road.evening_traffic);*/
        road.new_traffic_evening = TrafficUtils.calcTraffic(
          roadLoad,
          road.road.evening_traffic,
          eveningCountTrafficRoad,
        );

        road.is_deficit_morning = road.road.capacity < road.new_traffic_morning;

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
