import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from '../users/users.entity';
import { v4 as uuidv4 } from 'uuid';

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum LeaveType {
  PTO = 'PTO',
  SICK_LEAVE = 'SickLeave',
}

@Entity({ tableName: 'leaves' })
export class Leave {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => User)
  user!: User;

  @Property({ fieldName: 'approved_by' })
  manager!: number;

  @Property()
  date!: Date;

  @Enum({ items: () => LeaveStatus })
  status: LeaveStatus = LeaveStatus.PENDING;

  @Enum({ items: () => LeaveType })
  type: LeaveType;

  @Property()
  reason?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();

  constructor(data: Partial<Leave>) {
    Object.assign(this, data);
  }
}
