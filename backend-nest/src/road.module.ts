import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadService } from './services/road.service';
import { RoadController } from './controllers/road.controller';
import { RoadRepository } from './repositories/road.repository';
import { Road } from './entities/roads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Road])], // Import the Road entity
  controllers: [RoadController],
  providers: [RoadRepository, RoadService],
  exports: [RoadService], // Export if needed elsewhere
})
export class RoadModule {}
