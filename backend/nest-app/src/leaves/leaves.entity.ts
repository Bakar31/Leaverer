import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../users/users.entity';

@Entity({ tableName: 'leaves' })
export class Leave {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  approvedBy!: number;

  @Property()
  date!: Date;

  @Property()
  type!: string;

  @Property()
  reason?: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
