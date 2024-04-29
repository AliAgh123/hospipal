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

  @Post('patient/signup')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.createPatient(createPatientDto);
  }

  @Get('patient')
  findAll() {
    const userPromise = this.patientsService.findAllPatients();
    userPromise
      .then((users) => {
        // Check if the array is empty
        if (users.length === 0) {
          return 'no patients exist';
        } else {
          console.log('The array of users is not empty');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching users:', error);
      });
    return userPromise;
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
  async remove(@Param('id') id: string) {
    try {
      const result = await this.patientsService.removePatient(+id);
      if (result && result.affected !== undefined && result.affected === 0) {
        return 'Patient not found';
      } else {
        return 'Patient ${id} deleted successfully.';
      }
    } catch (error) {
      console.error('An error occurred while deleting rows:', error);
      return 'An error occurred while deleting rows.';
    }
  }

  // @Post('patient/login')
  // login(@Body() login: LoginDto) {
  //   if (
  //     login.email ===
  //     this.patientsService.findPatientByPassword(login.password)
  //   )
  //     return 'logged in successfully';
  //   else
  //     return this.patientsService.viewPatient(login.id);
  // }
}
