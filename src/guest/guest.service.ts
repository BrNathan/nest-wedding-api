import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddGuestDto } from './dto/add-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entity/guest.entity';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
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
}
