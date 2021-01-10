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
import { AddInvitationDto } from './dto/add-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entity/invitation.entity';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  async create(@Body() newInvitation: AddInvitationDto): Promise<Invitation> {
    return await this.invitationService.create(newInvitation);
  }

  @Get()
  async findAll(): Promise<Invitation[]> {
    return await this.invitationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Invitation> {
    return await this.invitationService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newInvitation: UpdateInvitationDto,
  ): Promise<void> {
    await this.invitationService.updateById(id, newInvitation);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.invitationService.deleteById(id);
  }
}
