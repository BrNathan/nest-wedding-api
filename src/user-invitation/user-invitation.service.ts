import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserInvitationDto } from './dto/add-user-invitation.dto';
import { UserInvitation } from './entity/user-invitation.entity';

@Injectable()
export class UserInvitationService {
  constructor(
    @InjectRepository(UserInvitation)
    private readonly userInvitationRepository: Repository<UserInvitation>,
  ) {}

  async deleteById(id: number) {
    return await this.userInvitationRepository.softDelete({ id: id });
  }
  async updateById(
    id: number,
    newUserInvitation: Partial<AddUserInvitationDto>,
  ) {
    return await this.userInvitationRepository.update(
      { id: id },
      newUserInvitation,
    );
  }
  async findById(id: number): Promise<UserInvitation> {
    return await this.userInvitationRepository.findOneOrFail(id);
  }
  async findAll(): Promise<UserInvitation[]> {
    return await this.userInvitationRepository.find();
  }
  async create(
    newUserInvitation: AddUserInvitationDto,
  ): Promise<UserInvitation> {
    throw new Error('Method not implemented.');
  }
}
