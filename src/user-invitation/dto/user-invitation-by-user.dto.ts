export class InvitationUserInvitationByUser {
  id: number;
  code: string;
  label: string;
}

export class UserInvitationByUser {
  id: number;
  userId: number;
  answer: boolean | null;
  invitationId: number;
  invitation: InvitationUserInvitationByUser;
}
