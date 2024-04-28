import { Entity, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Patient extends User {
  @Column()
  EmergencyContact: string;

  @Column({ type: 'simple-array', default: [] })
  currentMedication: string[];

  @Column({ type: 'simple-array', default: [] })
  labResults: string[];

  @Column({ type: 'simple-array', default: [] })
  allergens: string[];

  @Column({ type: 'simple-array', default: [] })
  reports: Report[];
}
