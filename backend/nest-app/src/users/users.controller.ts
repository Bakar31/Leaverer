/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async users() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUser(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
