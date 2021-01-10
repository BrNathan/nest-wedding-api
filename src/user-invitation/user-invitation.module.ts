import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInvitation } from './entity/user-invitation.entity';
import { UserInvitationController } from './user-invitation.controller';
import { UserInvitationService } from './user-invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInvitation])],
  controllers: [UserInvitationController],
  providers: [UserInvitationService],
})
export class UserInvitationModule {}
