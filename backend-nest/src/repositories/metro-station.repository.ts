// src/repositories/metro-station.repository.ts
import { Repository } from 'typeorm';
import { MetroStation } from '../entities/metro_stations.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetroStationRepository extends Repository<MetroStation> {
  // Custom methods can be added here
}
