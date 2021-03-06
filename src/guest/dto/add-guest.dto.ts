import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AddGuestDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSpouse?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isOther?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isUser?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isChildren?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(100)
  age?: number;

  @IsNotEmpty()
  @IsPositive()
  userId: number;
}
