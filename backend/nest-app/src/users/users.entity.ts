import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  ManyToOne,
  Enum,
  Collection,
} from '@mikro-orm/core';
import { Post } from 'src/posts/posts.entity';
import { Leave } from 'src/leaves/leaves.entity';
import { Organization } from 'src/organizations/organizations.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Property({ type: 'varchar', length: 100 })
  password!: string;

  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @OneToMany(() => Post, (post) => post.user)
  posts = new Collection<Post>(this);

  @OneToMany(() => Leave, (leave) => leave.user)
  leaves = new Collection<Leave>(this);

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
