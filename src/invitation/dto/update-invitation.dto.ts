import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateInvitationDto {
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
