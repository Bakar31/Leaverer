/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  async users() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
