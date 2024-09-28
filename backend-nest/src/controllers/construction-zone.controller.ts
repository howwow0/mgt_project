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

@ApiTags('construction-zones')
@Controller('construction-zones')
export class ConstructionZoneController {
  constructor(
    private readonly constructionZoneService: ConstructionZoneService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new construction zone' })
  async create(
    @Body() createConstructionZoneDto: CreateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    return this.constructionZoneService.create(createConstructionZoneDto);
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

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update an existing construction zone' })
  async update(
    @Param('id') id: number,
    @Body() updateConstructionZoneDto: UpdateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    return this.constructionZoneService.update(id, updateConstructionZoneDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a construction zone' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.constructionZoneService.remove(id);
  }
}
