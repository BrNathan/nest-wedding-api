export class GetGuest {
  fullname: string;
  age?: number;
  relation: string;
}
export class GetGuestResult {
  username: string;
  email: string;
  userFullname: string;
  invitationCode: string;
  answer: boolean;
  guests: GetGuest[];
}
