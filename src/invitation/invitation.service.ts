import { Injectable } from '@nestjs/common';
import { AddInvitationDto } from './dto/add-invitation.dto';
import { Invitation } from './entity/invitation.entity';

@Injectable()
export class InvitationService {
  deleteById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, newInvitation: Partial<AddInvitationDto>) {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Invitation> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Invitation[]> {
    throw new Error('Method not implemented.');
  }
  create(newInvitation: AddInvitationDto): Promise<Invitation> {
    throw new Error('Method not implemented.');
  }
}
