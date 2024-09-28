import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructionZone } from '../entities/construction_zones.entity';
import {
  CreateConstructionZoneDto,
  UpdateConstructionZoneDto,
} from '../dto/construction-zone.dto';
import { ConstructionZoneRepository } from '../repositories/construction-zone.repository';
import { MetroStation } from '../entities/metro_stations.entity';
import { Road } from '../entities/roads.entity';
import { MetroStationRepository } from '../repositories/metro-station.repository';
import { RoadRepository } from '../repositories/road.repository';
import {
  CreateMetroStationDto,
  UpdateMetroStationDto,
} from 'src/dto/metro-station.dto';
import { CreateRoadDto, UpdateRoadDto } from 'src/dto/road.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConstructionZoneService {
  constructor(
    @InjectRepository(ConstructionZone)
    private readonly constructionZoneRepository: ConstructionZoneRepository,
    @InjectRepository(MetroStation)
    private readonly metroStationRepository: MetroStationRepository,
    @InjectRepository(Road)
    private readonly roadRepository: RoadRepository,
  ) {}

  // Создание нового строительного района с добавлением метро и дорог в одной транзакции
  async create(
    createConstructionZoneDto: CreateConstructionZoneDto,
    createMetroStationDtos: CreateMetroStationDto[], // Массив DTO для метро
    createRoadDtos: CreateRoadDto[], // Массив DTO для дорог
  ): Promise<ConstructionZone> {
    return await this.constructionZoneRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        // Создание зоны
        const newConstructionZone = entityManager.create(
          ConstructionZone,
          createConstructionZoneDto,
        );
        const savedConstructionZone =
          await entityManager.save(newConstructionZone);

        // Создание метро
        const metroStations = createMetroStationDtos.map((dto) => {
          const metroStation = entityManager.create(MetroStation, {
            ...dto,
            constructionZone: savedConstructionZone,
          });
          return metroStation;
        });
        await entityManager.save(metroStations);

        // Создание дорог
        const roads = createRoadDtos.map((dto) => {
          const road = entityManager.create(Road, {
            ...dto,
            constructionZone: savedConstructionZone,
          });
          return road;
        });
        await entityManager.save(roads);

        return savedConstructionZone; // Возвращаем созданную зону
      },
    );
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

  // Обновление строительного района с обновлением метро и дорог в одной транзакции
  async update(
    id: number,
    updateConstructionZoneDto: UpdateConstructionZoneDto,
    updateMetroStationDtos: UpdateMetroStationDto[], // Массив DTO для метро
    updateRoadDtos: UpdateRoadDto[], // Массив DTO для дорог
  ): Promise<ConstructionZone> {
    return await this.constructionZoneRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        // Обновление строительного района
        const constructionZone = await entityManager.findOne(ConstructionZone, {
          where: { id },
        });
        if (!constructionZone) {
          throw new Error('Строительный район не найден');
        }

        entityManager.merge(
          ConstructionZone,
          constructionZone,
          updateConstructionZoneDto,
        );
        const updatedConstructionZone =
          await entityManager.save(constructionZone);

        // Обновление метро
        const metroStations = updateMetroStationDtos.map((dto) => {
          const metroStation = entityManager.create(MetroStation, {
            ...dto,
            constructionZone: updatedConstructionZone,
          });
          return metroStation;
        });
        await entityManager.save(metroStations);

        // Обновление дорог
        const roads = updateRoadDtos.map((dto) => {
          const road = entityManager.create(Road, {
            ...dto,
            constructionZone: updatedConstructionZone,
          });
          return road;
        });
        await entityManager.save(roads);

        return updatedConstructionZone; // Возвращаем обновленную зону
      },
    );
  }

  // Удаление строительного района
  async remove(id: number): Promise<void> {
    await this.constructionZoneRepository.delete(id);
  }
}
