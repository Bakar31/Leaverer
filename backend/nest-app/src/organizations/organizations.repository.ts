import { MikroORM } from '@mikro-orm/core';
import { Organization } from './organizations.entity';
import { NotFoundException } from '@nestjs/common';
import { EUserRole, User } from 'src/users/users.entity';

export interface OrganizationWithEmployeeCount {
  name: string;
  address: string;
  logo: string;
  employeesCount: number;
}

export class OrganizationRepository {
  constructor(private readonly orm: MikroORM) {}

  async findAll(): Promise<OrganizationWithEmployeeCount[]> {
    const organizationRepository = this.orm.em.getRepository(Organization);
    const orgs = await organizationRepository.findAll({ populate: ['users'] });
    const orgWithEmployeeCount = orgs.map((org) => ({
      ...org,
      users: null,
      employeesCount: org.users.length,
    }));
    return orgWithEmployeeCount;
  }

  async findOneById(id: number): Promise<Organization | null> {
    const organizationRepository = this.orm.em.getRepository(Organization);
    const organization = await organizationRepository.findOne({ id });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async findManager(id: number): Promise<User | null> {
    const userRepository = this.orm.em.getRepository(User);
    const manager = await userRepository.findOne({
      organization: id,
      role: EUserRole.MANAGER,
    });
    if (!manager) {
      throw new NotFoundException(
        `Manager not found in organization with ID ${id}`,
      );
    }

    return manager;
  }
}
