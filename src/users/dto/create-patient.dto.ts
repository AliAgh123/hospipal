import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreatePatientDto extends CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  emergencyContact: string;

  currentMedication: string[];

  labResults: string[];

  allergens: string[];
}
