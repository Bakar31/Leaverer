import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
