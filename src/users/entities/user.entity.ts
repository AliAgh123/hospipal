import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-array' })
  phoneNumbers: string[];

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({ enum: ['M', 'F'] })
  gender: 'M' | 'F';
}
