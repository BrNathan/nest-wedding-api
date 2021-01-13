import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/keys';
import { AddInvitationDto } from './dto/add-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entity/invitation.entity';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() newInvitation: AddInvitationDto): Promise<Invitation> {
    return await this.invitationService.create(newInvitation);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Invitation[]> {
    return await this.invitationService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Invitation> {
    return await this.invitationService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newInvitation: UpdateInvitationDto,
  ): Promise<void> {
    await this.invitationService.updateById(id, newInvitation);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.invitationService.deleteById(id);
  }
}
