import { Injectable } from '@nestjs/common';
import { AddGroupDto } from './dto/add-group.dto';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  deleteById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, newGroup: Partial<AddGroupDto>) {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Group[]> {
    throw new Error('Method not implemented.');
  }
  create(newGroup: AddGroupDto): Promise<Group> {
    throw new Error('Method not implemented.');
  }
}
