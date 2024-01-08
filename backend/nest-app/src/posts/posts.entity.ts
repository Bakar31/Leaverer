import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from 'src/users/users.entity';

@Entity()
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
