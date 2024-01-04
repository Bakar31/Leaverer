import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [UsersModule, AuthModule, MikroOrmModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
