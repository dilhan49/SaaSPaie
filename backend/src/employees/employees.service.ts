import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
}

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.repository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async create(payload: CreateEmployeeDto): Promise<Employee> {
    const employee = this.repository.create(payload);
    return this.repository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }
}

