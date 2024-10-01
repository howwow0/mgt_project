import {
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Polygon, Point, LineString } from 'geojson';
import { ApiProperty } from '@nestjs/swagger'; // Импортируйте ApiProperty

export class MetroStationDto {
  @ApiProperty({ description: 'Название станции метро' }) // Добавьте описание поля
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Позиция станции в виде точки (Point)' }) // Добавьте описание поля
  @IsNotEmpty()
  position: Point;

  @ApiProperty({ description: 'Утренний трафик на станции' }) // Добавьте описание поля
  @IsNumber()
  morning_traffic: number;

  @ApiProperty({ description: 'Вечерний трафик на станции' }) // Добавьте описание поля
  @IsNumber()
  evening_traffic: number;

  @ApiProperty({ description: 'Вместимость станции' }) // Добавьте описание поля
  @IsNumber()
  capacity: number;
}

export class RoadDto {
  @ApiProperty({ description: 'Название дороги' }) // Добавьте описание поля
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Геометрия дороги в виде линии (LineString)' }) // Добавьте описание поля
  @IsNotEmpty()
  geometry: LineString;

  @ApiProperty({ description: 'Утренний трафик на дороге' }) // Добавьте описание поля
  @IsNumber()
  morning_traffic: number;

  @ApiProperty({ description: 'Вечерний трафик на дороге' }) // Добавьте описание поля
  @IsNumber()
  evening_traffic: number;

  @ApiProperty({ description: 'Вместимость дороги' }) // Добавьте описание поля
  @IsNumber()
  capacity: number;
}

export class ConstructionZoneAreaDto {
  @ApiProperty({ description: 'Площадь строительной зоны' }) // Добавьте описание поля
  @IsNotEmpty()
  zone_area: number;

  @ApiProperty({ description: 'Идентификатор типа строительства' }) // Добавьте описание поля
  @IsNotEmpty()
  @IsNumber()
  construction_type_id: number;
}

export class CreateConstructionZoneDto {
  @ApiProperty({ description: 'Название строительной зоны' }) // Добавьте описание поля
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Геометрия зоны в виде полигона (Polygon)' }) // Добавьте описание поля
  @IsNotEmpty()
  area: Polygon;

  @ApiProperty({
    required: true,
    type: [RoadDto],
    description: 'Обязательная дорога',
  }) // Добавьте описание поля
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RoadDto)
  road: RoadDto[]; // Одна обязательная дорога

  @ApiProperty({
    required: true,
    type: [ConstructionZoneAreaDto],
    description: 'Тип площади зоны',
  }) // Добавьте описание поля
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConstructionZoneAreaDto)
  zoneArea: ConstructionZoneAreaDto[]; // Один обязательный тип площади

  @ApiProperty({
    required: false,
    type: [MetroStationDto],
    description: 'Необязательный массив станций метро',
  }) // Укажите, что это массив MetroStationDto
  @IsOptional() // Метро необязательно
  @ValidateNested({ each: true })
  @Type(() => MetroStationDto)
  metroStations?: MetroStationDto[];
}
