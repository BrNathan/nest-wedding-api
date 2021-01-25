import { IsEmail, IsString } from 'class-validator';

export class EmailChecked {
  @IsString()
  @IsEmail()
  email: string;
}
