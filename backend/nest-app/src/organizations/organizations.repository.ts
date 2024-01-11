import { MikroORM } from '@mikro-orm/core';
import { Organization } from './organizations.entity';
import { NotFoundException } from '@nestjs/common';

export class OrganizationRepository {
  constructor(private readonly orm: MikroORM) {}

  async findAll(): Promise<Organization[]> {
    const organizationRepository = this.orm.em.getRepository(Organization);
    return organizationRepository.findAll();
  }

  async findOneById(id: number): Promise<Organization | null> {
    const organizationRepository = this.orm.em.getRepository(Organization);
    const organization = await organizationRepository.findOne({ id });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }
}
