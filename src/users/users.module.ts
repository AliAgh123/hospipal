import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { PatientsController } from './controllers/patient.controller';

import { PhysiciansController } from './controllers/physician.controller';
import { PhysicianService } from './services/physician.service';
import { PatientService } from './services/patient.service';
import { Patient } from './entities/patient.entity';
import { Physician } from './entities/physician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Physician]),
  ],
  controllers: [UsersController, PatientsController, PhysiciansController],
  providers: [UsersService, PhysicianService, PatientService],
})
export class UsersModule {}
