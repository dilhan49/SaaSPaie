import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, (employee) => employee.contracts, {
    onDelete: 'CASCADE',
  })
  employee!: Employee;

  @Column()
  type!: string;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column({ type: 'float' })
  baseSalary!: number;

  @Column({ default: 'FULL_TIME' })
  workingTimeType!: string;

  @Column({ type: 'float', nullable: true })
  hoursPerWeek?: number;
}

