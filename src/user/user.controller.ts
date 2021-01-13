import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/keys';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() newUser: AddUserDto): Promise<User> {
    return await this.userService.create(newUser);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: Partial<AddUserDto>,
  ): Promise<void> {
    await this.userService.updateById(id, newUser);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteById(id);
  }
}
