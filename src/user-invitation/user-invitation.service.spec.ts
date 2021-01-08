import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationService } from './user-invitation.service';

describe('UserInvitationService', () => {
  let service: UserInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInvitationService],
    }).compile();

    service = module.get<UserInvitationService>(UserInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
