import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructionZone } from '../entities/construction_zones.entity';
import {
  CreateConstructionZoneDto,
  UpdateConstructionZoneDto,
} from '../dto/construction-zone.dto';
import { ConstructionZoneRepository } from '../repositories/construction-zone.repository';

@Injectable()
export class ConstructionZoneService {
  constructor(
    @InjectRepository(ConstructionZone)
    private readonly constructionZoneRepository: ConstructionZoneRepository,
  ) {}

  // Создание нового строительного района
  async create(
    createConstructionZoneDto: CreateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    const newConstructionZone = this.constructionZoneRepository.create(
      createConstructionZoneDto,
    );
    return this.constructionZoneRepository.save(newConstructionZone);
  }

  // Получение всех строительных районов
  async findAll(): Promise<ConstructionZone[]> {
    return this.constructionZoneRepository.find({
      relations: ['constructionType'],
    }); // Загрузить связанные данные
  }

  // Получение одного строительного района по ID
  async findOne(id: number): Promise<ConstructionZone> {
    return this.constructionZoneRepository.findOne({
      where: { id },
      relations: ['constructionType'],
    });
  }

  // Обновление существующего строительного района
  async update(
    id: number,
    updateConstructionZoneDto: UpdateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    await this.constructionZoneRepository.update(id, updateConstructionZoneDto);
    return this.findOne(id);
  }

  // Удаление строительного района
  async remove(id: number): Promise<void> {
    await this.constructionZoneRepository.delete(id);
  }
}
