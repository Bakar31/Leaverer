import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrganizationService } from './organizations.service';
import { Organization } from './organizations.entity';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async organizations() {
    return this.organizationService.getAllOrgs();
  }

  @Post()
  async createOrganization(@Body() data: Partial<Organization>) {
    return this.organizationService.create(data);
  }
}
