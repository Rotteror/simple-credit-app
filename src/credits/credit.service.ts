import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credit } from "./Entities/credit.entity";

@Injectable()
export class CreditService {

    constructor(@InjectRepository(Credit) private creditRepository: Repository<Credit>) {

    }

    async getOneByCreditId(id: number): Promise<Credit> {
        const result = await this.creditRepository.findOne(id);
        return result;
    }

    async getCreditsByUserId(id: number): Promise<Credit[]> {
        const result = await this.creditRepository.find({ user_id: id });
        return [...result];
    }


}