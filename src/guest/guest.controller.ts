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
import { AddGuestDto } from './dto/add-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entity/guest.entity';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() newGuest: AddGuestDto): Promise<Guest> {
    return await this.guestService.create(newGuest);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Guest[]> {
    return await this.guestService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Guest> {
    return await this.guestService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newGuest: UpdateGuestDto,
  ): Promise<void> {
    await this.guestService.updateById(id, newGuest);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.guestService.deleteById(id);
  }
}
