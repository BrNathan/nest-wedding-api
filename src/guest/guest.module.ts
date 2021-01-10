import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { Guest } from './entity/guest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  providers: [GuestService],
  controllers: [GuestController],
})
export class GuestModule {}
