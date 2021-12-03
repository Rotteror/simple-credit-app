import { Module } from "@nestjs/common";
import { CreditsController } from "./credits.controller";
import { CreditService } from "./credit.service"
import { TypeOrmModule } from "@nestjs/typeorm";
import { Credit } from "./Entities/credit.entity";
import { Status } from "./Entities/status.entity";
import { Installment } from "./Entities/installment.entity";
import { InstallmentModule } from "src/installments/installment.module";

@Module({
    imports: [InstallmentModule,TypeOrmModule.forFeature([Credit,Status,Installment])],
    controllers: [CreditsController],
    providers: [CreditService],
    exports: [CreditService],
})
export class CreditModule {};