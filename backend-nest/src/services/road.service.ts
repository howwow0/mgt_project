// src/services/road.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Road } from '../entities/roads.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoadService {
  constructor(
    @InjectRepository(Road)
    private readonly roadRepository: Repository<Road>,
  ) {}

  async findAll(): Promise<Road[]> {
    return this.roadRepository.find();
  }

  async findOne(id: number): Promise<Road> {
    return this.roadRepository.findOne({ where: { id } });
  }

  async create(road: Road): Promise<Road> {
    return this.roadRepository.save(road);
  }

  async update(id: number, road: Road): Promise<Road> {
    await this.roadRepository.update(id, road);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roadRepository.delete(id);
  }
}
