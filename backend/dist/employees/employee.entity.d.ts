import { Contract } from '../contracts/contract.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    birthDate?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: string;
    contracts: Contract[];
}
