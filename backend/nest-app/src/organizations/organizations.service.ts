import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Organization } from './organizations.entity';
import { OrganizationRepository } from './organizations.repository';

@Injectable()
export class OrganizationService {
  private organizationRepository: OrganizationRepository;
  constructor(private readonly orm: MikroORM) {
    this.organizationRepository = new OrganizationRepository(this.orm);
  }

  async getAllOrgs(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async getOrg(id: string) {
    return this.organizationRepository.findOneById(+id);
  }

  async create(data: Partial<Organization>): Promise<Organization> {
    const organizationRepository = this.orm.em.getRepository(Organization);
    const organization = organizationRepository.create(data);
    await organizationRepository.persistAndFlush(organization);
    return organization;
  }
}
