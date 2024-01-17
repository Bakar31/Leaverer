import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from '../users/users.entity';

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity({ tableName: 'leaves' })
export class Leave {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ fieldName: 'approved_by' })
  approvedBy!: User;

  @Property()
  date!: Date;

  @Enum({ items: () => LeaveStatus })
  status: LeaveStatus = LeaveStatus.PENDING;

  @Property()
  type!: string;

  @Property()
  reason?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}
