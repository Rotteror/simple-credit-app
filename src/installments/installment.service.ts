import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Installment } from "src/credits/Entities/installment.entity";
import { Repository } from "typeorm";



@Injectable()
export class InstallmentService {

    constructor(@InjectRepository(Installment) private readonly installmentRepository: Repository<Installment>) {}

    async getInstallmentsByCreditId(creditId: number): Promise<Installment[]> {
        const result = await this.installmentRepository.find({where: {credit: creditId}});
       
        return result;
    }

}

