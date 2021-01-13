import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/keys';
import { AddUserInvitationDto } from './dto/add-user-invitation.dto';
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
  @Patch(':id')
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
}
