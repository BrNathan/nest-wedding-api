import { Injectable } from '@nestjs/common';
import { AddGuestDto } from './dto/add-guest.dto';
import { Guest } from './entity/guest.entity';

@Injectable()
export class GuestService {
  deleteById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, newGuest: Partial<AddGuestDto>) {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Guest> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Guest[]> {
    throw new Error('Method not implemented.');
  }
  create(newGuest: AddGuestDto): Promise<Guest> {
    throw new Error('Method not implemented.');
  }
}
