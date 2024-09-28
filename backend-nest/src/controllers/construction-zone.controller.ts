import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ConstructionZoneService } from '../services/construction-zone.service';
import {
  CreateConstructionZoneDto,
  UpdateConstructionZoneDto,
} from '../dto/construction-zone.dto';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { CreateRoadDto, UpdateRoadDto } from '../dto/road.dto';
import {
  CreateMetroStationDto,
  UpdateMetroStationDto,
} from '../dto/metro-station.dto';

@ApiTags('construction-zones')
@Controller('construction-zones')
export class ConstructionZoneController {
  constructor(
    private readonly constructionZoneService: ConstructionZoneService,
  ) {}

  @Post()
  async create(
    @Body() createConstructionZoneDto: CreateConstructionZoneDto,
    @Body('metroStations') metroStationDtos: CreateMetroStationDto[], // Массив DTO для метро
    @Body('roads') roadDtos: CreateRoadDto[], // Массив DTO для дорог
  ) {
    return this.constructionZoneService.create(
      createConstructionZoneDto,
      metroStationDtos,
      roadDtos,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConstructionZoneDto: UpdateConstructionZoneDto,
    @Body('metroStations') metroStationDtos: UpdateMetroStationDto[], // Массив DTO для метро
    @Body('roads') roadDtos: UpdateRoadDto[], // Массив DTO для дорог
  ) {
    return this.constructionZoneService.update(
      id,
      updateConstructionZoneDto,
      metroStationDtos,
      roadDtos,
    );
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all construction zones' })
  async findAll(): Promise<ConstructionZone[]> {
    return this.constructionZoneService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a construction zone by ID' })
  async findOne(@Param('id') id: number): Promise<ConstructionZone> {
    return this.constructionZoneService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a construction zone' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.constructionZoneService.remove(id);
  }
}
