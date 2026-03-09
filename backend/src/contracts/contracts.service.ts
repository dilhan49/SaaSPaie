import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Employee } from '../employees/employee.entity';

export interface CreateContractDto {
  employeeId: number;
  type: string;
  startDate: string;
  endDate?: string;
  baseSalary: number;
  workingTimeType?: string;
  hoursPerWeek?: number;
}

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['employee'] });
  }

  async create(payload: CreateContractDto): Promise<Contract> {
    const employee = await this.employeeRepository.findOne({
      where: { id: payload.employeeId },
    });
    if (!employee) {
      throw new NotFoundException(
        `Employee with id ${payload.employeeId} not found`,
      );
    }

    const contract = this.contractRepository.create({
      employee,
      type: payload.type,
      startDate: payload.startDate,
      endDate: payload.endDate,
      baseSalary: payload.baseSalary,
      workingTimeType: payload.workingTimeType ?? 'FULL_TIME',
      hoursPerWeek: payload.hoursPerWeek,
    });

    return this.contractRepository.save(contract);
  }
}

