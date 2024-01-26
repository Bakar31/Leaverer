import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from '../users/users.entity';

@Entity({ tableName: 'organizations' })
export class Organization {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @Property()
  address!: string;

  @Property()
  logo!: string;

  @OneToMany(() => User, (user) => user.organization)
  users = new Collection<User>(this);

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}
