import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserJwt } from 'src/decorator/user-jwt.decorator';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { ERole } from 'src/keys';
import { AddGuestDto } from './dto/add-guest.dto';
import { GuestByUser } from './dto/guest-by-user.dto';
import { RefreshGuestByUser } from './dto/refresh-guest-by-user.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entity/guest.entity';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Roles(ERole.ADMIN)
  @Post()
  async create(@Body() newGuest: AddGuestDto): Promise<Guest> {
    return await this.guestService.create(newGuest);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<Guest[]> {
    return await this.guestService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Guest> {
    return await this.guestService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newGuest: UpdateGuestDto,
  ): Promise<void> {
    await this.guestService.updateById(id, newGuest);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.guestService.deleteById(id);
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Get('user/:userId')
  async getByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @UserJwt() userInfo: UserJwtPayload,
  ): Promise<GuestByUser[]> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }

    const guests: Guest[] = await this.guestService.findByUser(userId);
    return guests.map((g) => {
      return {
        firstName: g.firstName,
        lastName: g.lastName,
        isChildren: g.isChildren,
        isOther: g.isOther,
        isSpouse: g.isSpouse,
        isUser: g.isUser,
        userId: g.user.id,
        age: g.age,
        id: g.id,
      };
    });
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Post('refresh/user/:userId')
  async refreshGuestByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @UserJwt() userInfo: UserJwtPayload,
    @Body() newGuests: RefreshGuestByUser[],
  ): Promise<{ result: boolean }> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }
    if (newGuests.some((ng) => ng.userId !== userId)) {
      throw new ForbiddenException("You don't have access to this ressource");
    }

    const result: boolean = await this.guestService.refreshGuestByUserId(
      userId,
      newGuests,
    );

    return { result: result };
  }

  // @post('/guests/refresh/user/{id}', {
  // @authenticate({strategy: 'jwt', options: {requiredRoles: [EGroup.ADM, EGroup.INV]}})
  // async refresh(
  //   @param.path.number('id') id: number,
  //   @requestBody.array(getModelSchemaRef(Guest, {title: 'NewGuest', exclude: ['id']}))
  //   guests: Omit<Guest, 'id'>[],
  // ): Promise<{result: boolean}> {
  //   if (this.user.id !== id) {
  //     throw new HttpErrors.Forbidden("You don't have access to this data")
  //   }
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
  // }
}
