import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddGroupDto } from './dto/add-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async deleteById(id: number) {
    return await this.groupRepository.softDelete({ id: id });
  }
  async updateById(id: number, newGroup: UpdateGroupDto) {
    const group = await this.groupRepository.preload({
      id,
      ...newGroup,
    });
    if (!group) {
      throw new NotFoundException(`Cannot find guest with id : ${id}`);
    }
    return await this.groupRepository.save(group);
  }
  async findById(id: number): Promise<Group> {
    return await this.groupRepository.findOneOrFail(id);
  }
  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }
  async create(newGroup: AddGroupDto): Promise<Group> {
    return await this.groupRepository.save(newGroup);
  }
}
