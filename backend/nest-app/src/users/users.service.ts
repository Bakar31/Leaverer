/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../users/users.entity';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;
  constructor(private readonly orm: MikroORM) {
    this.userRepository = new UserRepository(this.orm);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUser(identifier: string) {
    if (!isNaN(Number(identifier))) {
      const id = Number(identifier);
      return this.userRepository.findOneById(id);
    } else {
      return this.userRepository.findOneByEmail(identifier);
    }
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
