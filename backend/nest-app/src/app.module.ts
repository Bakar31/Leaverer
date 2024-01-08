import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [UsersModule, AuthModule, MikroOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
