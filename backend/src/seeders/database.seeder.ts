import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, EUserRole } from '../users/users.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      firstName: 'super',
      lastName: 'admin',
      email: 'superadmin@sazim.io',
      password: 'superpass',
      role: EUserRole.SUPERADMIN,
      organization: null,
    });
  }
}
