import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { Patient } from 'src/users/entities/patient.entity';
import { Physician } from 'src/users/entities/physician.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Physician)
    private readonly physicianRepository: Repository<Physician>,
  ) {}

  createReport(createReportDto: CreateReportDto): Promise<Report> {
    const report: Report = new Report();
    const physicianId = createReportDto.reportedUserId;
    report.UserReported = this.physicianRepository.findOneBy({
      id: physicianId,
    });
    report.reportedBy = this.patientRepository.findOneBy({
      id: createReportDto.reportedById,
    });
    report.description = createReportDto.description;
    return this.reportRepository.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  findOne(id: number): Promise<Report> {
    return this.reportRepository.findOneBy({ serialNumber: id });
  }

  update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report: Report = new Report();
    const physicianId = updateReportDto.reportedUserId;
    report.UserReported = this.physicianRepository.findOneBy({
      id: physicianId,
    });
    report.reportedBy = this.patientRepository.findOneBy({
      id: updateReportDto.reportedById,
    });
    report.description = updateReportDto.description;
    return this.reportRepository.save(report);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.reportRepository.delete(id);
  }
}
