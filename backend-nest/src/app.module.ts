import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadModule } from './road.module';
import { AppDataSource } from './ormconfig';
import { ConstructionZoneModule } from './construction-zone.module';
import { MetroStationZoneModule } from './metro-station.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await AppDataSource.initialize();
        return AppDataSource.options;
      },
    }),
    RoadModule,
    MetroStationZoneModule,
    ConstructionZoneModule,
  ],
})
export class AppModule {}
