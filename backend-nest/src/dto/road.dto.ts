import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDecimal,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoadDto {
  @ApiProperty({ description: 'The name of the road' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The geometry of the road' })
  @IsNotEmpty()
  geometry: { type: 'LineString'; coordinates: number[][] }; // Adjust this type as needed

  @ApiProperty({ description: 'Morning traffic count' })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '10,2' })
  morning_traffic: number;

  @ApiProperty({ description: 'Evening traffic count' })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '10,2' })
  evening_traffic: number;

  @ApiProperty({ description: 'The capacity of the road' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}

export class UpdateRoadDto {
  @ApiProperty({ description: 'The name of the road' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The geometry of the road' })
  @IsOptional()
  geometry: { type: 'LineString'; coordinates: number[][] };

  @ApiProperty({ description: 'Morning traffic count' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '10,2' })
  morning_traffic: number;

  @ApiProperty({ description: 'Evening traffic count' })
  @IsOptional()
  @IsDecimal({ decimal_digits: '10,2' })
  evening_traffic: number;

  @ApiProperty({ description: 'The capacity of the road' })
  @IsOptional()
  @IsNumber()
  capacity: number;
}
