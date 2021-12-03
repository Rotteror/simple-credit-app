import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { InstallmentService } from "src/installments/installment.service";
import { CreditService } from "./credit.service";

@Controller('credits')
export class CreditsController {

    constructor(private readonly creditService: CreditService, private readonly installmentService: InstallmentService) { }

    //Test - how NestJs works
    @Get(':id')
    async getCredit(@Param('id') id: number) {
        return this.creditService.getOneByCreditId(id);
    }

    @Get('user/:id')
    async getCreditByUserId(@Param('id') id: number) {
        const result = await this.creditService.getCreditsByUserId(id);
        let creditStatusScore = calculateScore(result);

        let paymentDate;
        let maturityDate;
        // TO CHECK IF PAYMENT DATE IS NULLABLE     

        for (const r of result) {
            
            if (r.repayment_date) {
                const installmentPayment = await this.installmentService.getInstallmentsByCreditId(r.id);

                for (const installment of installmentPayment) {
                    paymentDate = new Date(installment.payment_date);
                    maturityDate = new Date(installment.maturity_date);

                    const isPayedInTime = dateCompare(paymentDate, maturityDate);
                  
                    creditStatusScore[isPayedInTime]++;
                }
                
            }

        }

        return [...result, [creditStatusScore]];
    }


}

function calculateScore(result) {
    const numberCredits = result.length;
    let rejected = 0;
    let repaid = 0;
    let overdue = 0;
    let loss = 0;
    let approved = 0;
    for (const r of result) {
        if (r.status.name == 'REJECTED') {
            rejected++;
        } else if (r.status.name == 'REPAID') {
            repaid++;
        } else if (r.status.name == 'OVERDUE') {
            overdue++;
        } else if (r.status.name == 'LOSS') {
            loss++;
        } else if (r.status.name == 'APPROVED') {
            approved++;
        }
    }

    rejected = (rejected / numberCredits) * 100;
    repaid = (repaid / numberCredits) * 100;
    overdue = (overdue / numberCredits) * 100;
    loss = (loss / numberCredits) * 100;
    approved = (approved / numberCredits) * 100;

    return {
        'rejected': rejected,
        'repaid': repaid,
        'overdue': overdue,
        'loss': loss,
        'approved': approved,
        'late': 0,
        'intime': 0,
    }

}

function dateCompare(paymentDate, maturityDate) {
    let result = "";

    if (paymentDate < maturityDate) {
        // 'He paid in time';
        result = 'intime';
    } else if (paymentDate > maturityDate) {
        //'He was late in payment';
        result = 'late';
    } else if ((paymentDate.getDate() == maturityDate.getDate()) &&
        (paymentDate.getYear() == maturityDate.getYear()) &&
        (paymentDate.getMonth() == maturityDate.getMonth())) {
        // 'He paid same day';
        result = 'intime';
    }

    return result;
}