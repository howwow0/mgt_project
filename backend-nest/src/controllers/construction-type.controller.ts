import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConstructionTypeService } from '../services/construction-types.service';
import { ConstructionType } from '../entities/construction_types.entity';

@ApiTags('construction-types')
@Controller('construction-types')
export class ConstructionTypeController {
  constructor(
    private readonly constructionTypeService: ConstructionTypeService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all construction types',
  })
  async findAll(): Promise<ConstructionType[]> {
    return this.constructionTypeService.findAll();
  }
}
