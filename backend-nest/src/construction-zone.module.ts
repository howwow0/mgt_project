import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionZone } from './entities/construction_zones.entity';
import { ConstructionZoneService } from './services/construction-zone.service';
import { ConstructionZoneController } from './controllers/construction-zone.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConstructionZone])],
  providers: [ConstructionZoneService],
  controllers: [ConstructionZoneController],
})
export class ConstructionZoneModule {}
