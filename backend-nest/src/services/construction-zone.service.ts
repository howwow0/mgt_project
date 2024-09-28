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

  async findAll(): Promise<ConstructionZone[]> {
    const zones = await this.constructionZoneRepository.find({
      relations: [
        'zoneMetroTraffic.metro_station', // Получение данных о метро
        'zoneRoadTraffic.road', // Получение данных о дорогах
        'constructionZoneArea.construction_type', // Получение данных о типах строительства
      ],
    });
    return zones;
  }
}
