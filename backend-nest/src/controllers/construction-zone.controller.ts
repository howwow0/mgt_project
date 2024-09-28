import { Controller, Get } from '@nestjs/common';
import { ConstructionZoneService } from '../services/construction-zone.service';
import { ConstructionZone } from '../entities/construction_zones.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
