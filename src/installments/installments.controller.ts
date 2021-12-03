import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { InstallmentService } from "./installment.service";


@Controller('installments')
export class InstallmentsController {

    constructor(private readonly installmentService: InstallmentService) { }


    @Get(':id')
    async getIstanallmentsByCredit(@Param('id') id: number) {
        const result = await this.installmentService.getInstallmentsByCreditId(id);
        return result;
    }
}

