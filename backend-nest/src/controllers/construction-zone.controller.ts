import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConstructionZoneService } from '../services/construction-zone.service';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateConstructionZoneDto } from '../dto/create-construction-zone.dto';

@ApiTags('construction-zones')
@Controller('construction-zones')
export class ConstructionZoneController {
  constructor(
    private readonly constructionZoneService: ConstructionZoneService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all construction zones with metro and roads',
  })
  async findAll(): Promise<ConstructionZone[]> {
    return this.constructionZoneService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new construction zone with metro and roads',
    type: ConstructionZone,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async createZone(
    @Body() createConstructionZoneDto: CreateConstructionZoneDto,
  ): Promise<ConstructionZone> {
    console.log(createConstructionZoneDto);
    return this.constructionZoneService.create(createConstructionZoneDto);
  }
}
