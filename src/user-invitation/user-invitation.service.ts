import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserInvitationDto } from './dto/add-user-invitation.dto';
import { AnswerUserInvitation } from './dto/answer-user-invitation.dto';
import { UserInvitationByUser } from './dto/user-invitation-by-user.dto';
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

  async findByUser(userId: number): Promise<UserInvitation[]> {
    return await this.userInvitationRepository
      .createQueryBuilder('UI')
      .leftJoinAndSelect('UI.user', 'user')
      .leftJoinAndSelect('UI.invitation', 'invitation')
      .where('user.id = :userId', { userId: userId })
      .getMany();
  }

  async answerUserInvitation(
    userId: number,
    answerUserInvitation: AnswerUserInvitation,
  ): Promise<{ count: number }> {
    const toto = await this.userInvitationRepository
      .createQueryBuilder()
      .update()
      .set({ answer: answerUserInvitation.answer })
      .where('id IN (:ids)', { ids: answerUserInvitation.userInvitationIds })
      .execute();

    return { count: toto.affected };
  }
}
