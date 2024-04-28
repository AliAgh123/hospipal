import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  createPatient(CreatePatientDto: CreatePatientDto): Promise<Patient> {
    const patient: Patient = new Patient();
    patient.name = CreatePatientDto.name;
    patient.email = CreatePatientDto.email;
    patient.password = CreatePatientDto.password;
    patient.phoneNumbers = CreatePatientDto.phoneNumbers;
    patient.dateOfBirth = CreatePatientDto.dateOfBirth;
    patient.country = CreatePatientDto.country;
    patient.street = CreatePatientDto.street;
    patient.city = CreatePatientDto.city;
    patient.gender = CreatePatientDto.gender;
    patient.EmergencyContact = CreatePatientDto.emergencyContact;
    patient.currentMedication = CreatePatientDto.currentMedication;
    patient.labResults = CreatePatientDto.labResults;
    patient.allergens = CreatePatientDto.allergens;
    return this.patientRepository.save(patient);
  }

  findAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findAllIds(): Promise<number[]> {
    const patients = await this.patientRepository.find({ select: ['id'] });
    return patients.map((patient) => patient.id);
  }

  viewPatient(id: number): Promise<Patient> {
    return this.patientRepository.findOneBy({ id });
  }

  updatePatients(
    id: number,
    updatePatientsDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient: Patient = new Patient();
    patient.name = updatePatientsDto.name;
    patient.email = updatePatientsDto.email;
    patient.phoneNumbers = updatePatientsDto.phoneNumbers;
    patient.password = updatePatientsDto.password;
    patient.dateOfBirth = updatePatientsDto.dateOfBirth;
    patient.country = updatePatientsDto.country;
    patient.street = updatePatientsDto.street;
    patient.city = updatePatientsDto.city;
    patient.gender = updatePatientsDto.gender;
    return this.patientRepository.save(patient);
  }

  removePatient(id: number): Promise<{ affected?: number }> {
    return this.patientRepository.delete(id);
  }

  findPatientByEmail(email: string): Promise<Patient> {
    return this.patientRepository.findOneBy({ email });
  }

  findPatientByPassword(password: string): Promise<Patient> {
    return this.patientRepository.findOneBy({ password });
  }
}
