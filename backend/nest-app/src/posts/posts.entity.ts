import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../users/users.entity';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ columnType: 'text' })
  body!: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
