import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoadService } from '../services/road.service';
import { CreateRoadDto, UpdateRoadDto } from '../dto/road.dto';
import { Road } from '../entities/roads.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('roads') // Tag for grouping in Swagger
@Controller('roads')
export class RoadController {
  constructor(private readonly roadService: RoadService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all roads' })
  async findAll(): Promise<Road[]> {
    return this.roadService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a road by ID' })
  async findOne(@Param('id') id: number): Promise<Road> {
    return this.roadService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new road' })
  async create(@Body() createRoadDto: CreateRoadDto): Promise<Road> {
    const road = new Road();
    Object.assign(road, createRoadDto);
    return this.roadService.create(road);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update an existing road' })
  async update(
    @Param('id') id: number,
    @Body() updateRoadDto: UpdateRoadDto,
  ): Promise<Road> {
    const road = new Road();
    Object.assign(road, updateRoadDto);
    return this.roadService.update(id, road);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a road' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.roadService.remove(id);
  }
}
