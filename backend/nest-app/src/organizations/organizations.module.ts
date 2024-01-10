import { Module } from '@nestjs/common';
import { OrganizationService } from './organizations.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Organization } from './organizations.entity';
import { OrganizationController } from './organizations.controller';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Organization] })],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationsModule {}
