import { IsBoolean, IsNumber } from 'class-validator';

export class AnswerUserInvitation {
  @IsNumber({}, { each: true })
  userInvitationIds: number[];

  @IsBoolean()
  answer: boolean;
}
