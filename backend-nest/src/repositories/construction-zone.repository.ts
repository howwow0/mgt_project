// src/repositories/construction-zone.repository.ts
import { Repository } from 'typeorm';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstructionZoneRepository extends Repository<ConstructionZone> {
  // Custom methods can be added here
}
