import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstructionType } from '../entities/construction_types.entity';

@Injectable()
export class ConstructionTypeService {
  constructor(
    @InjectRepository(ConstructionType)
    private readonly constructionTypeRepository: Repository<ConstructionType>,
  ) {}

  async findAll(): Promise<ConstructionType[]> {
    return this.constructionTypeRepository.find();
  }
}
