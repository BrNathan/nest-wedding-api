import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationController } from './user-invitation.controller';

describe('UserInvitationController', () => {
  let controller: UserInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInvitationController],
    }).compile();

    controller = module.get<UserInvitationController>(UserInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
