import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../users/users.entity';

@Entity({ tableName: 'notifications' })
export class Notification {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => User)
  receiver!: User;

  @Property()
  message!: string;

  @Property({ default: false })
  read: boolean = false;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}
