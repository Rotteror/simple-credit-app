import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Credit } from "src/credits/Entities/credit.entity";
import { Installment } from "../credits/Entities/installment.entity";
import { InstallmentService } from "./installment.service";
import { InstallmentsController } from "./installments.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Installment,Credit])],
    controllers: [InstallmentsController],
    providers: [InstallmentService],
    exports: [InstallmentService],
})
export class InstallmentModule {};