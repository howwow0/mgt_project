// src/repositories/road.repository.ts
import { Repository } from 'typeorm';
import { Road } from '../entities/roads.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoadRepository extends Repository<Road> {
  // Custom methods can be added here
}
