"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("./contract.entity");
const employee_entity_1 = require("../employees/employee.entity");
let ContractsService = class ContractsService {
    contractRepository;
    employeeRepository;
    constructor(contractRepository, employeeRepository) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
    }
    async findAll() {
        return this.contractRepository.find({ relations: ['employee'] });
    }
    async create(payload) {
        const employee = await this.employeeRepository.findOne({
            where: { id: payload.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with id ${payload.employeeId} not found`);
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
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map