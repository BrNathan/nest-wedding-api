import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { InvitationModule } from './invitation/invitation.module';
import { GuestModule } from './guest/guest.module';

@Module({
  imports: [GroupModule, InvitationModule, GuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
