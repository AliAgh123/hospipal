import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Physician } from 'src/users/entities/physician.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class PhysicianDoesNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Physician)
    private readonly physicianRepository: Repository<Physician>,
  ) {}
  validate(id: any, args: ValidationArguments) {
    const user = this.physicianRepository.findOneBy({ id });
    console.log(user);
    return !!user;
  }
}
export function PhysicianDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PhysicianDoesNotExistConstraint,
    });
  };
}
