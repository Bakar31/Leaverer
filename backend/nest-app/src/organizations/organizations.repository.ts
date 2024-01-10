import { MikroORM } from '@mikro-orm/core';
import { Organization } from './organizations.entity';

export class OrganizationRepository {
  constructor(private readonly orm: MikroORM) {}

  async findAll(): Promise<Organization[]> {
    const userRepository = this.orm.em.getRepository(Organization);
    return userRepository.findAll();
  }
}
