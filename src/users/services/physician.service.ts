import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhysicianDto } from '../dto/create-physician.dto';
import { UpdatePhysicianDto } from '../dto/update-physician.dto';
import { Physician } from '../entities/physician.entity';
@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(Physician)
    private readonly physicianRepository: Repository<Physician>,
  ) {}

  createPhysician(CreatePhysicianDto: CreatePhysicianDto): Promise<Physician> {
    const physician: Physician = new Physician();
    physician.name = CreatePhysicianDto.name;
    physician.email = CreatePhysicianDto.email;
    physician.password = CreatePhysicianDto.password;
    physician.phoneNumbers = CreatePhysicianDto.phoneNumbers;
    physician.dateOfBirth = CreatePhysicianDto.dateOfBirth;
    physician.country = CreatePhysicianDto.country;
    physician.street = CreatePhysicianDto.street;
    physician.city = CreatePhysicianDto.city;
    physician.gender = CreatePhysicianDto.gender;
    physician.Certificate = CreatePhysicianDto.Certificate;
    physician.Specialty = CreatePhysicianDto.Specialty;
    return this.physicianRepository.save(physician);
  }

  findAllPhysicians(): Promise<Physician[]> {
    return this.physicianRepository.find();
  }

  viewPhysician(id: number): Promise<Physician> {
    return this.physicianRepository.findOneBy({ id });
  }

  updatePhysician(
    id: number,
    updatePhysicianDto: UpdatePhysicianDto,
  ): Promise<Physician> {
    const physician: Physician = new Physician();
    physician.id = id;
    physician.name = updatePhysicianDto.name;
    physician.email = updatePhysicianDto.email;
    physician.phoneNumbers = updatePhysicianDto.phoneNumbers;
    physician.password = updatePhysicianDto.password;
    physician.dateOfBirth = updatePhysicianDto.dateOfBirth;
    physician.country = updatePhysicianDto.country;
    physician.street = updatePhysicianDto.street;
    physician.city = updatePhysicianDto.city;
    physician.gender = updatePhysicianDto.gender;
    physician.Certificate = updatePhysicianDto.Certificate;
    physician.Specialty = updatePhysicianDto.Specialty;
    return this.physicianRepository.save(physician);
  }

  removePhysician(id: number): Promise<{ affected?: number }> {
    return this.physicianRepository.delete(id);
  }
}
