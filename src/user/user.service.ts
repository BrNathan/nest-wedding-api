import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async deleteById(id: number) {
    return await this.userRepository.softDelete({ id: id });
  }
  async updateById(id: number, newUser: Partial<AddUserDto>) {
    return await this.userRepository.update({ id: id }, newUser);
  }
  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async create(newUser: AddUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
