import { Injectable } from '@nestjs/common';
import { AddUserInvitationDto } from './dto/add-user-invitation.dto';
import { UserInvitation } from './entity/user-invitation.entity';

@Injectable()
export class UserInvitationService {
  deleteById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, newUserInvitation: Partial<AddUserInvitationDto>) {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<UserInvitation> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserInvitation[]> {
    throw new Error('Method not implemented.');
  }
  create(newUserInvitation: AddUserInvitationDto): Promise<UserInvitation> {
    throw new Error('Method not implemented.');
  }
}
