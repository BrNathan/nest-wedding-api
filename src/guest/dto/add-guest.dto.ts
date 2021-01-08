export class AddGuestDto {
  firstName: string;
  lastName: string;
  isSpouse?: boolean;
  isOther?: boolean;
  isUser?: boolean;
  isChildren?: boolean;
  age?: number;
  userId: number;
}
