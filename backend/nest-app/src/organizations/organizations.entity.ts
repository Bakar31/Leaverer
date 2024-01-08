import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from 'src/users/users.entity';

@Entity()
export class Organization {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  address!: string;

  @Property()
  logo!: string;

  @OneToMany(() => User, (user) => user.organization)
  users = new Collection<User>(this);

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
