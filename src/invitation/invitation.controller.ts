import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/keys';
import { AddInvitationDto } from './dto/add-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entity/invitation.entity';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Roles(ERole.ADMIN)
  @Post()
  async create(@Body() newInvitation: AddInvitationDto): Promise<Invitation> {
    return await this.invitationService.create(newInvitation);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<Invitation[]> {
    return await this.invitationService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Invitation> {
    return await this.invitationService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newInvitation: UpdateInvitationDto,
  ): Promise<void> {
    await this.invitationService.updateById(id, newInvitation);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.invitationService.deleteById(id);
  }
}
