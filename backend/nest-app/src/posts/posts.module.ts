import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './posts.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Post] })],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
