import { ContractsService, type CreateContractDto } from './contracts.service';
import { Contract } from './contract.entity';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    findAll(): Promise<Contract[]>;
    create(body: CreateContractDto): Promise<Contract>;
}
