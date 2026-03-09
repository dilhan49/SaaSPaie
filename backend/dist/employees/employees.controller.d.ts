import { type CreateEmployeeDto, EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    create(body: CreateEmployeeDto): Promise<Employee>;
    remove(id: number): Promise<void>;
}
