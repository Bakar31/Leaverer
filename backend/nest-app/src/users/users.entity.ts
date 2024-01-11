import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  ManyToOne,
  Enum,
  Collection,
} from '@mikro-orm/core';
import { Post } from '../posts/posts.entity';
import { Leave } from '../leaves/leaves.entity';
import { Organization } from '../organizations/organizations.entity';

export enum EUserRole {
  SUPERADMIN = 'superAdmin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: 'first_name' })
  firstName!: string;

  @Property({ fieldName: 'last_name' })
  lastName!: string;

  @Property({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Property({ type: 'varchar', length: 100 })
  password!: string;

  @Enum({ items: () => EUserRole })
  role: EUserRole = EUserRole.EMPLOYEE;

  @ManyToOne(() => Organization, { nullable: true })
  organization!: Organization | null;

  @OneToMany(() => Post, (post) => post.user)
  posts = new Collection<Post>(this);

  @OneToMany(() => Leave, (leave) => leave.user)
  leaves = new Collection<Leave>(this);

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}
