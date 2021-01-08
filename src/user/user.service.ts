import { Injectable } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  deleteById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, newUser: Partial<AddUserDto>) {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  create(newUser: AddUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
