import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../users/users.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => User)
  user!: User;

  @Property({ columnType: 'text' })
  body!: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}
