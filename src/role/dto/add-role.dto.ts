import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  label: string;
}
