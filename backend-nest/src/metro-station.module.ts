import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetroStation } from './entities/metro_stations.entity';
import { MetroStationService } from './services/metro-station.service';
import { MetroStationController } from './controllers/metro-station.constroller';

@Module({
  imports: [TypeOrmModule.forFeature([MetroStation])],
  providers: [MetroStationService],
  controllers: [MetroStationController],
})
export class MetroStationZoneModule {}
