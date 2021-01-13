import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async deleteById(id: number) {
    return await this.roleRepository.softDelete({ id: id });
  }
  async updateById(id: number, newRole: UpdateRoleDto) {
    const role = await this.roleRepository.preload({
      id,
      ...newRole,
    });
    if (!role) {
      throw new NotFoundException(`Cannot find role with id : ${id}`);
    }
    return await this.roleRepository.save(role);
  }
  async findById(id: number): Promise<Role> {
    return await this.roleRepository.findOneOrFail(id);
  }
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
  async create(newRole: AddRoleDto): Promise<Role> {
    return await this.roleRepository.save(newRole);
  }
}
