import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Polygon } from 'geojson';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConstructionZoneDto {
  @ApiProperty({ description: 'The name of the construction zone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The area defined as a polygon' })
  area: Polygon;

  @ApiProperty({ description: 'The area of the zone in square meters' })
  @IsNumber()
  zone_area: number;

  @ApiProperty({ description: 'The ID of the construction type, related to ConstructionType' })
  @IsNumber()
  construction_type_id: number; // Foreign key for relation with ConstructionType
}

export class UpdateConstructionZoneDto {
  @ApiProperty({ description: 'The name of the construction zone', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The area defined as a polygon', required: false })
  @IsOptional()
  area?: Polygon;

  @ApiProperty({ description: 'The area of the zone in square meters', required: false })
  @IsNumber()
  @IsOptional()
  zone_area?: number;

  @ApiProperty({ description: 'The ID of the construction type, related to ConstructionType', required: false })
  @IsNumber()
  @IsOptional()
  construction_type_id?: number; // Foreign key for relation with ConstructionType
}
