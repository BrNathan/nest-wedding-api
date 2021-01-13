import {
  IsString,
  Length,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @Length(3, 3)
  code: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(60)
  label: string;
}
