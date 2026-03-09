import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContractsService, type CreateContractDto } from './contracts.service';
import { Contract } from './contract.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractsService.findAll();
  }

  @Post()
  async create(@Body() body: CreateContractDto): Promise<Contract> {
    return this.contractsService.create(body);
  }
}

