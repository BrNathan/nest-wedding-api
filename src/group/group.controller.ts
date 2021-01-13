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
import { AddGroupDto } from './dto/add-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() newGroup: AddGroupDto): Promise<Group> {
    return await this.groupService.create(newGroup);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Group[]> {
    return await this.groupService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return await this.groupService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newGroup: UpdateGroupDto,
  ): Promise<void> {
    await this.groupService.updateById(id, newGroup);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.groupService.deleteById(id);
  }
}
