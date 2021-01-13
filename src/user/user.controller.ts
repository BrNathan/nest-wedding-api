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
import { ERole } from 'src/keys';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ERole.ADMIN)
  @Post()
  async create(@Body() newUser: AddUserDto): Promise<User> {
    return await this.userService.create(newUser);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: Partial<AddUserDto>,
  ): Promise<void> {
    await this.userService.updateById(id, newUser);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteById(id);
  }
}
