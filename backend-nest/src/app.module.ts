import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './configs/ormconfig';
import { ConstructionZoneModule } from './construction-zone.module';
import { ConstructionTypeModule } from './construction-type.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await AppDataSource.initialize();
        return AppDataSource.options;
      },
    }),
    ConstructionZoneModule,
    ConstructionTypeModule,
  ],
})
export class AppModule {}
