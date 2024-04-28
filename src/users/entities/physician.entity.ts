import { Entity, Column } from 'typeorm';
import { User } from './user.entity';
import { Report } from 'src/reports/entities/report.entity';

@Entity()
export class Physician extends User {
  @Column('varchar', { length: 200 })
  Certificate: string;

  @Column()
  Specialty: string;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ type: 'simple-array', default: [] })
  reports: Report[];
}
