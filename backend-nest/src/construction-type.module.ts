import { Module } from '@nestjs/common';
import { ConstructionTypeController } from './controllers/construction-type.controller';
import { ConstructionTypeService } from './services/construction-types.service';
import { ConstructionType } from './entities/construction_types.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConstructionType])],
  controllers: [ConstructionTypeController],
  providers: [ConstructionTypeService],
})
export class ConstructionTypeModule {}
