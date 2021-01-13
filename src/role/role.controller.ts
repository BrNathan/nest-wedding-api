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
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entity/role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(ERole.ADMIN)
  @Post()
  async create(@Body() newRole: AddRoleDto): Promise<Role> {
    return await this.roleService.create(newRole);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.roleService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newRole: UpdateRoleDto,
  ): Promise<void> {
    await this.roleService.updateById(id, newRole);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.roleService.deleteById(id);
  }
}
