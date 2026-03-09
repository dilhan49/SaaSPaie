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
export declare class ContractsService {
    private readonly contractRepository;
    private readonly employeeRepository;
    constructor(contractRepository: Repository<Contract>, employeeRepository: Repository<Employee>);
    findAll(): Promise<Contract[]>;
    create(payload: CreateContractDto): Promise<Contract>;
}
