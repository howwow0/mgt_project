// src/repositories/construction-type.repository.ts
import { Repository } from 'typeorm';
import { ConstructionType } from '../entities/construction_types.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstructionTypeRepository extends Repository<ConstructionType> {
  // Custom methods can be added here
}
