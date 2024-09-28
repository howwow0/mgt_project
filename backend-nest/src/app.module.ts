import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadModule } from './road.module';
import { AppDataSource } from './ormconfig';
import { ConstructionType } from './entities/construction_types.entity';
import { ConstructionZone } from './entities/construction_zones.entity';
import { MetroStation } from './entities/metro_stations.entity';
import { ZoneMetroTraffic } from './entities/zone_metro_traffic.entity';
import { ZoneRoadTraffic } from './entities/zone_road_traffic.entity';
import { Road } from './entities/roads.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await AppDataSource.initialize();
        return AppDataSource.options;
      },
    }),
    RoadModule,
    ConstructionType,
    ConstructionZone,
    MetroStation,
    ZoneMetroTraffic,
    ZoneRoadTraffic,
    Road,
  ],
})
export class AppModule {}
