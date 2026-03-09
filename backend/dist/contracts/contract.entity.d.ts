import { Employee } from '../employees/employee.entity';
export declare class Contract {
    id: number;
    employee: Employee;
    type: string;
    startDate: string;
    endDate?: string;
    baseSalary: number;
    workingTimeType: string;
    hoursPerWeek?: number;
}
