import { MikroORM } from '@mikro-orm/core';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

export class UserRepository {
  constructor(private readonly orm: MikroORM) {}

  async find(query: object, options?: object): Promise<User[]> {
    const userRepository = this.orm.em.getRepository(User);
    return userRepository.find(query, options);
  }

  async findAll(): Promise<User[]> {
    const userRepository = this.orm.em.getRepository(User);
    return userRepository.findAll();
  }

  async findOneById(id: number): Promise<User | null> {
    const userRepository = this.orm.em.getRepository(User);
    const user = await userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userRepository = this.orm.em.getRepository(User);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const userRepository = this.orm.em.getRepository(User);
    const user = userRepository.create(data);
    await userRepository.persistAndFlush(user);
    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const userRepository = this.orm.em.getRepository(User);
    const user = await userRepository.findOne({ id });
    console.log(user);
    if (!user) {
      return null;
    }
    userRepository.assign(user, data);
    await userRepository.flush();
    return user;
  }
}
