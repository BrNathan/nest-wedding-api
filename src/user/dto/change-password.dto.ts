import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
