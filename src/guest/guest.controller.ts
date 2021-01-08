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
import { AddGuestDto } from './dto/add-guest.dto';
import { Guest } from './entity/guest.entity';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  async create(@Body() newGuest: AddGuestDto): Promise<Guest> {
    return await this.guestService.create(newGuest);
  }

  @Get()
  async findAll(): Promise<Guest[]> {
    return await this.guestService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Guest> {
    return await this.guestService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newGuest: Partial<AddGuestDto>,
  ): Promise<void> {
    await this.guestService.updateById(id, newGuest);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.guestService.deleteById(id);
  }
}
