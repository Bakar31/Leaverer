import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrganizationService } from './organizations.service';
import { Organization } from './organizations.entity';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async organizations() {
    return this.organizationService.getAllOrgs();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.organizationService.getOrg(id);
  }

  @Get(':id/manager')
  async getOrgManager(@Param('id') id: string) {
    return this.organizationService.getOrgManager(id);
  }

  @Post()
  async createOrganization(@Body() data: Partial<Organization>) {
    return this.organizationService.create(data);
  }
}
