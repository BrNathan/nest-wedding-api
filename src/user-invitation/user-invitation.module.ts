import { Module } from '@nestjs/common';
import { UserInvitationController } from './user-invitation.controller';
import { UserInvitationService } from './user-invitation.service';

@Module({
  controllers: [UserInvitationController],
  providers: [UserInvitationService]
})
export class UserInvitationModule {}
