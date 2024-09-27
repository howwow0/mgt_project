// src/repositories/zone-road-traffic.repository.ts
import { Repository } from 'typeorm';
import { ZoneRoadTraffic } from '../entities/zone_road_traffic.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ZoneRoadTrafficRepository extends Repository<ZoneRoadTraffic> {
  // Custom methods can be added here
}
