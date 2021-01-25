import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { CompleteUser } from './dto/complete-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

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

  async completeUserInfo(userId: number, newUser: CompleteUser): Promise<User> {
    const user = await this.userRepository.findOneOrFail(userId);

    user.isAlreadyConnected = true;
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;
    user.password = await bcrypt.hash(newUser.password, user.salt);

    const updatedUser: User = await this.userRepository.save(user);

    return updatedUser;
  }

  async isEmailAvailable(emailToCheck: string): Promise<boolean> {
    const result: number = await this.userRepository.count({
      where: {
        email: emailToCheck,
      },
    });
    return result === 0;
  }
}
