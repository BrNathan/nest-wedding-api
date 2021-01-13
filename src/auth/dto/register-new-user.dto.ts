import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterNewUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @MinLength(6)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
