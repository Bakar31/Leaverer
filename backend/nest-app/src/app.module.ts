import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './users/users.entity';
import { Organization } from './organizations/organizations.entity';
import { Leave } from './leaves/leaves.entity';
import { Post } from './posts/posts.entity';
import { UsersService } from './users/users.service';
import { OrganizationController } from './organizations/organizations.controller';
import { OrganizationsModule } from './organizations/organizations.module';
import mikroOrmConfig from './config/mikro-orm.config';
import { OrganizationService } from './organizations/organizations.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature({ entities: [User, Organization, Leave, Post] }),
    OrganizationsModule,
  ],
  controllers: [OrganizationController],
  providers: [UsersService, OrganizationService],
})
export class AppModule {}
