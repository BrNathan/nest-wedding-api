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
import { ERole } from 'src/keys';
import { AddGuestDto } from './dto/add-guest.dto';
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
  @Patch(':id')
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
}
