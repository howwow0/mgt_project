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
        'constructionType',
        'zoneMetroTraffic.metro_station',
        'zoneRoadTraffic.road',
      ],
    });

    return zones.map((zone) => {
    //  zone.zoneMetroTraffic.forEach(p=>{
       //toDO calc
      //});
      return zone;
    });
  }
}
