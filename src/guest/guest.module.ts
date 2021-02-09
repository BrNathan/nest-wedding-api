import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { Guest } from './entity/guest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInvitation } from 'src/user-invitation/entity/user-invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest]),
    TypeOrmModule.forFeature([UserInvitation]),
  ],
  providers: [GuestService],
  controllers: [GuestController],
})
export class GuestModule {}
