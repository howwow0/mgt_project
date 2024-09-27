// src/repositories/zone-metro-traffic.repository.ts
import { Repository } from 'typeorm';
import { ZoneMetroTraffic } from '../entities/zone_metro_traffic.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ZoneMetroTrafficRepository extends Repository<ZoneMetroTraffic> {
  // Custom methods can be added here
}
