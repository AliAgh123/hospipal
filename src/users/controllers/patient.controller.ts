import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('users')
@UsePipes(new ValidationPipe())
export class PatientsController {
  constructor(private readonly patientsService: PatientService) {}

  @Post('patient')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.createPatient(createPatientDto);
  }

  @Get('patient')
  findAll() {
    return this.patientsService.findAllPatients();
  }

  @Get('patient/:id')
  findOne(@Param('id') id: string) {
    return this.patientsService.viewPatient(+id);
  }

  @Patch('patient/:id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.updatePatients(+id, updatePatientDto);
  }

  @Delete('patient/:id')
  remove(@Param('id') id: string) {
    return this.patientsService.removePatient(+id);
  }

  @Post('patient/login')
  login(@Body() login: LoginDto) {
    if (
      this.patientsService.findPatientByEmail(login.email) ===
      this.patientsService.findPatientByPassword(login.password)
    )
      return 'logged in successfully';
    else
      return (
        [this.patientsService.viewPatient(login.id),
        this.patientsService.findPatientByPassword(login.password)]
      );
  }
}
