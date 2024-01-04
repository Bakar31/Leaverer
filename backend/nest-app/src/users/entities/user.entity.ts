import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'varchar', length: 100 })
  name!: string;

  @Property({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Property({ type: 'varchar', length: 100 })
  password!: string;
}
