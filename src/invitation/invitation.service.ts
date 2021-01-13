import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddInvitationDto } from './dto/add-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entity/invitation.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
  ) {}

  async deleteById(id: number) {
    return await this.invitationRepository.softDelete({ id: id });
  }
  async updateById(id: number, newInvitation: UpdateInvitationDto) {
    const invitation = await this.invitationRepository.preload({
      id,
      ...newInvitation,
    });
    if (!invitation) {
      throw new NotFoundException(`Cannot find invitation with id : ${id}`);
    }
    return await this.invitationRepository.save(invitation);
  }
  async findById(id: number): Promise<Invitation> {
    return await this.invitationRepository.findOneOrFail(id);
  }
  async findAll(): Promise<Invitation[]> {
    return await this.invitationRepository.find();
  }
  async create(newInvitation: AddInvitationDto): Promise<Invitation> {
    return await this.invitationRepository.save(newInvitation);
  }
}
