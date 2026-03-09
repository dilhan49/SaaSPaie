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
export declare class EmployeesService {
    private readonly repository;
    constructor(repository: Repository<Employee>);
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    create(payload: CreateEmployeeDto): Promise<Employee>;
    remove(id: number): Promise<void>;
}
