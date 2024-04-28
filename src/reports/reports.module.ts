import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Patient } from 'src/users/entities/patient.entity';
import { Physician } from 'src/users/entities/physician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Physician]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
