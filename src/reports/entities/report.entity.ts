import { Patient } from 'src/users/entities/patient.entity';
import { Physician } from 'src/users/entities/physician.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  serialNumber: number;

  @ManyToOne(() => Physician, (physician) => physician.reports)
  UserReported: Promise<Physician>;

  @ManyToOne(() => Patient, (patient) => patient.reports)
  reportedBy: Promise<Patient>;

  @CreateDateColumn()
  dateTime: Date;

  @Column()
  description: string;
}
