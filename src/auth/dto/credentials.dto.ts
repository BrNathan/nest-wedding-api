import { IsNotEmpty, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @MinLength(1)
  emailOrUsername: string;

  @IsNotEmpty()
  @MinLength(1)
  password: string;
}
