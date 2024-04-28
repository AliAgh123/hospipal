import { IsNotEmpty, IsObject, IsString, IsInt } from 'class-validator';
import { Patient } from 'src/users/entities/patient.entity';
import { Physician } from 'src/users/entities/physician.entity';
import { PatientService } from 'src/users/services/patient.service';
import { PhysicianDoesNotExist } from './PhysicianExists.validato';
import { PatientDoesNotExist } from './PatientExists.validator';

export class CreateReportDto {
  constructor(private readonly patientsService: PatientService) {}

  UserReported: Physician;

  reportedBy: Patient;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  // @PhysicianDoesNotExist({ message: 'This user does not exist' })
  reportedUserId: number;

  @IsNotEmpty()
  @IsInt()
  // @PatientDoesNotExist({ message: 'This user does not exist' })
  reportedById: number;
}
