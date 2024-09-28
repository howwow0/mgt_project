// src/services/road.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetroStation } from '../entities/metro_stations.entity';
import { MetroStationRepository } from '../repositories/metro-station.repository';

@Injectable()
export class MetroStationService {
  constructor(
    @InjectRepository(MetroStation)
    private readonly roadRepository: MetroStationRepository,
  ) {}

  async findAll(): Promise<MetroStation[]> {
    return this.roadRepository.find();
  }

  async findOne(id: number): Promise<MetroStation> {
    return this.roadRepository.findOne({ where: { id } });
  }

  async create(road: MetroStation): Promise<MetroStation> {
    return this.roadRepository.save(road);
  }

  async update(id: number, road: MetroStation): Promise<MetroStation> {
    await this.roadRepository.update(id, road);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roadRepository.delete(id);
  }
}
