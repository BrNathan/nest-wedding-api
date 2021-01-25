import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  ForbiddenException,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserJwt } from 'src/decorator/user-jwt.decorator';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { ERole } from 'src/keys';
import { AddUserInvitationDto } from './dto/add-user-invitation.dto';
import { AnswerUserInvitation } from './dto/answer-user-invitation.dto';
import { UserInvitationByUser } from './dto/user-invitation-by-user.dto';
import { UserInvitation } from './entity/user-invitation.entity';
import { UserInvitationService } from './user-invitation.service';

@Controller('user-invitation')
export class UserInvitationController {
  constructor(private readonly userInvitationService: UserInvitationService) {}

  @Roles(ERole.ADMIN)
  @Post()
  async create(
    @Body() newUserInvitation: AddUserInvitationDto,
  ): Promise<UserInvitation> {
    return await this.userInvitationService.create(newUserInvitation);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<UserInvitation[]> {
    return await this.userInvitationService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserInvitation> {
    return await this.userInvitationService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUserInvitation: Partial<AddUserInvitationDto>,
  ): Promise<void> {
    await this.userInvitationService.updateById(id, newUserInvitation);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userInvitationService.deleteById(id);
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Get('user/:userId')
  async getByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @UserJwt() userInfo: UserJwtPayload,
  ): Promise<UserInvitationByUser[]> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }

    const userInvitation = await this.userInvitationService.findByUser(userId);
    return userInvitation.map((ui) => {
      return {
        answer: ui.answer,
        id: ui.id,
        userId: ui.user.id,
        invitationId: ui.invitation.id,
        invitation: {
          code: ui.invitation.code,
          label: ui.invitation.label,
          id: ui.invitation.id,
        },
      };
    });
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Put('answer/user/:userId')
  async answerByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @UserJwt() userInfo: UserJwtPayload,
    @Body() answersUserInvitation: AnswerUserInvitation,
  ): Promise<{ count: number }> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }

    return await this.userInvitationService.answerUserInvitation(
      userId,
      answersUserInvitation,
    );
  }
}
