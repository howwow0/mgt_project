import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Polygon, Point, LineString } from 'geojson';

export class MetroStationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  position: Point;

  @IsNumber()
  morning_traffic: number;

  @IsNumber()
  evening_traffic: number;

  @IsNumber()
  capacity: number;
}

export class RoadDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  geometry: LineString;

  @IsNumber()
  morning_traffic: number;

  @IsNumber()
  evening_traffic: number;

  @IsNumber()
  capacity: number;
}

export class ConstructionZoneAreaDto {
  @IsNotEmpty()
  zone_area: number;

  @IsNotEmpty()
  @IsNumber()
  construction_type_id: number;
}

export class CreateConstructionZoneDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  area: Polygon;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoadDto)
  road: RoadDto; // Одна обязательная дорога

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ConstructionZoneAreaDto)
  zoneArea: ConstructionZoneAreaDto; // Один обязательный тип площади

  @IsOptional() // Метро необязательно
  @ValidateNested({ each: true })
  @Type(() => MetroStationDto)
  metroStations?: MetroStationDto[];
}
