import { Module } from '@nestjs/common';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Leave } from './leaves.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Leave] })],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}
