import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Patient } from 'src/users/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class PatientDoesNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly patientRepository: Repository<Patient>) {}
  validate(id: number, args: ValidationArguments) {
    const user = this.patientRepository.findOneBy({ id });
    return !!user;
  }
}
export function PatientDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PatientDoesNotExistConstraint,
    });
  };
}
