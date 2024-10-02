import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionZone } from './entities/construction_zones.entity';
import { ConstructionZoneService } from './services/construction-zone.service';
import { ConstructionZoneController } from './controllers/construction-zone.controller';
import { ConstructionZoneArea } from './entities/construction_zone_area.entity';
import { MetroStation } from './entities/metro_stations.entity';
import { Road } from './entities/roads.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConstructionZone,
      ConstructionZoneArea,
      MetroStation,
      Road,
    ]),
  ],
  controllers: [ConstructionZoneController],
  providers: [ConstructionZoneService],
})
export class ConstructionZoneModule {}
