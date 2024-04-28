import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class CreatePhysicianDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  Certificate: string;

  @IsNotEmpty()
  @IsString()
  Specialty: string;
}
