import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, AuthModule, MikroOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
