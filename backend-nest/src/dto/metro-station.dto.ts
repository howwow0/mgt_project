import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Point } from 'geojson';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetroStationDto {
  @ApiProperty({ description: 'The name of the metro station' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The geographical position of the metro station as a Point' })
  position: Point;

  @ApiProperty({
    description: 'The morning traffic in decimal format',
    example: 1200.0,
  })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: false },
    { message: 'Morning traffic must be a valid decimal number' },
  )
  morning_traffic: number;

  @ApiProperty({
    description: 'The evening traffic in decimal format',
    example: 1500.0,
  })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: false },
    { message: 'Evening traffic must be a valid decimal number' },
  )
  evening_traffic: number;

  @ApiProperty({ description: 'The capacity of the metro station' })
  @IsNumber()
  capacity: number;
}

export class UpdateMetroStationDto {
  @ApiProperty({ description: 'The name of the metro station', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The geographical position of the metro station as a Point', required: false })
  @IsOptional()
  position?: Point;

  @ApiProperty({
    description: 'The morning traffic in decimal format',
    example: 1200.0,
    required: false,
  })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: false },
    { message: 'Morning traffic must be a valid decimal number' },
  )
  @IsOptional()
  morning_traffic?: number;

  @ApiProperty({
    description: 'The evening traffic in decimal format',
    example: 1500.00,
    required: false,
  })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: false },
    { message: 'Evening traffic must be a valid decimal number' },
  )
  @IsOptional()
  evening_traffic?: number;

  @ApiProperty({ description: 'The capacity of the metro station', required: false })
  @IsNumber()
  @IsOptional()
  capacity?: number;
}
