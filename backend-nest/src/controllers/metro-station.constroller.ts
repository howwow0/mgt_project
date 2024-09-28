import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MetroStationService } from '../services/metro-station.service';
import { MetroStation } from '../entities/metro_stations.entity';
import {
  CreateMetroStationDto,
  UpdateMetroStationDto,
} from '../dto/metro-station.dto';

@ApiTags('metro-stations')
@Controller('metro-stations')
export class MetroStationController {
  constructor(private readonly metroStationService: MetroStationService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all metro-stations' })
  async findAll(): Promise<MetroStation[]> {
    return this.metroStationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a metro-station by ID' })
  async findOne(@Param('id') id: number): Promise<MetroStation> {
    return this.metroStationService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new metro-station' })
  async create(
    @Body() createMetroStationDto: CreateMetroStationDto,
  ): Promise<MetroStation> {
    const road = new MetroStation();
    Object.assign(road, createMetroStationDto);
    return this.metroStationService.create(road);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update an existing metro-station' })
  async update(
    @Param('id') id: number,
    @Body() updateMetroStationDto: UpdateMetroStationDto,
  ): Promise<MetroStation> {
    const road = new MetroStation();
    Object.assign(road, updateMetroStationDto);
    return this.metroStationService.update(id, road);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a metro-station' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.metroStationService.remove(id);
  }
}
