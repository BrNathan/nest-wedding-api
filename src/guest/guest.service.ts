import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInvitation } from 'src/user-invitation/entity/user-invitation.entity';
import { User } from 'src/user/entity/user.entity';
import { Connection, Repository } from 'typeorm';
import { AddGuestDto } from './dto/add-guest.dto';
import { GetGuest, GetGuestResult } from './dto/get-guest-result.dto';
import { RefreshGuestByUser } from './dto/refresh-guest-by-user.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entity/guest.entity';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(UserInvitation)
    private readonly userInvitationRepository: Repository<UserInvitation>,
    private readonly connection: Connection,
  ) {}

  async deleteById(id: number) {
    return await this.guestRepository.softDelete({ id: id });
  }

  async updateById(id: number, newGuest: UpdateGuestDto) {
    const guest = await this.guestRepository.preload({
      id,
      ...newGuest,
    });
    if (!guest) {
      throw new NotFoundException(`Cannot find guest with id : ${id}`);
    }
    return await this.guestRepository.save(guest);
  }

  async findById(id: number): Promise<Guest> {
    return await this.guestRepository.findOneOrFail(id);
  }

  async findAll(): Promise<Guest[]> {
    return await this.guestRepository.find();
  }

  async create(newGuest: AddGuestDto): Promise<Guest> {
    return await this.guestRepository.save(newGuest);
  }

  async findByUser(userId: number): Promise<Guest[]> {
    return await this.guestRepository
      .createQueryBuilder('G')
      .leftJoinAndSelect('G.user', 'user')
      .where('user.id = :userId', { userId: userId })
      .getMany();
  }

  async refreshGuestByUserId(
    userId: number,
    newGuests: RefreshGuestByUser[],
  ): Promise<boolean> {
    let result = false;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const deleteResult = await queryRunner.manager
        .createQueryBuilder<Guest>(Guest, 'G')
        .leftJoinAndSelect('G.user', 'user')
        .softDelete()
        .where('user.id = :userId', { userId: userId })
        .execute();

      const user: User = await queryRunner.manager.findOneOrFail<User>(
        User,
        userId,
      );
      const newGuestCreate: Guest[] = await queryRunner.manager.create<Guest>(
        Guest,
        newGuests.map((ng) => {
          return {
            firstName: ng.firstName,
            lastName: ng.lastName,
            isSpouse: ng.isSpouse,
            isOther: ng.isOther,
            isUser: ng.isUser,
            isChildren: ng.isChildren,
            age: ng.age,
          };
        }),
      );
      for (const guest of newGuestCreate) {
        guest.user = user;
      }
      const savedGuestCreate: Guest[] = await queryRunner.manager.save<Guest>(
        newGuestCreate,
      );

      await queryRunner.commitTransaction();
      result = true;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      result = false;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result;
  }

  async getGuestByInvitationCode(
    invitationCode: string,
  ): Promise<GetGuestResult[]> {
    const result = await this.userInvitationRepository
      .createQueryBuilder('UI')
      .innerJoinAndSelect('UI.user', 'user')
      .innerJoinAndSelect('UI.invitation', 'invitation')
      .innerJoinAndSelect('user.guests', 'guest')
      .where('invitation.code = :invitationCode', {
        invitationCode: invitationCode,
      })
      .andWhere('guest.deletedAt is NULL')
      .getMany();

    return result.map((ui) => {
      return {
        username: ui.user.username,
        answer: ui.answer,
        email: ui.user.email,
        userFullname: ui.user.firstName + ' ' + ui.user.lastName,
        invitationCode: ui.invitation.code,
        guests: ui.user.guests.map((g) => {
          return {
            fullname: g.firstName + ' ' + g.lastName,
            age: g.age,
          } as GetGuest;
        }),
      } as GetGuestResult;
    });
  }

  //   const userGuests = [...guests.map(g => {
  //     const guest = {...g};
  //     guest.userId = id;
  //     return guest;
  //   })]

  //   const tx = await this.guestRepository.beginTransaction(IsolationLevel.REPEATABLE_READ);

  //   let result = false;
  //   try {

  //     const resultDelete = await this.guestRepository.deleteAll({userId: id}, {transaction: tx});
  //     const resultInsert = await this.guestRepository.createAll(userGuests, {transaction: tx});

  //     await tx.commit();

  //     result = true;
  //   } catch (error) {
  //     await tx.rollback();
  //     result = false;
  //   }

  //   return {result};
}
