import { MikroORM } from '@mikro-orm/core';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

export class UserRepository {
  constructor(private readonly orm: MikroORM) {}

  async findAllUsers(): Promise<User[]> {
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

  async findUserByEmail(email: string): Promise<User | null> {
    const userRepository = this.orm.em.getRepository(User);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const userRepository = this.orm.em.getRepository(User);
    const user = await userRepository.findOne({ id });
    if (!user) {
      return `User with ID ${id} not found`;
    }
    userRepository.assign(user, updateUserDto);
    await userRepository.flush();
    return `User with ID ${id} updated successfully`;
  }
}
