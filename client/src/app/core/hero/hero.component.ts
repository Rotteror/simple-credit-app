import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  //  TO DO dinamicly to calculate monthly payment

  monthlyAmount: number | undefined;
  userId = localStorage.getItem('id') || null || undefined
  creditScore: any | undefined;
  appliedForLoan: boolean = false;

  decision: string | undefined;

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private coreService: CoreService) {
    this.form = this.fb.group({
      sum: ['', [Validators.required]],
      period: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.fetchCreditScore(this.userId!)
    setTimeout(() => {
      console.log(this.creditScore[this.creditScore.length - 1][0])
    }, 10000);
  }


  fetchCreditScore(userId: string): void {
    this.creditScore = undefined;
    this.coreService.gerCreditsByUserId(userId).subscribe(r => this.creditScore = r);
  }

  requestLoan(): void {
    if (!this.form.value) { return }
    const result = this.form.value
    result.userId = this.userId; // send this object if his/her score is GOOD

    this.monthlyAmount = (result.sum * 1.30) / result.period
  
    this.appliedForLoan = true;

    setTimeout(() => {
      this.appliedForLoan = false;
      this.scoreLoanDecision(this.creditScore)
    }, 10000);

  };

  scoreLoanDecision(creditHistoryValues: any): any {
    let userScore = creditHistoryValues[creditHistoryValues.length - 1][0]; // userScore object
    let installments = userScore['late'] + userScore['intime']; //total payments for all loans so far
    let percentLatePayments = (userScore['late'] / installments) * 100; //percent late payments

    if (userScore['repaid'] > 90 && percentLatePayments < 10) {
      return this.decision = 'Поздравления, Вие сте одобрен!';
    } else if (userScore['repaid'] > 90 && percentLatePayments > 10) {
      return this.decision = 'Ще се свържем с Вас!';
    } else if (userScore['rejected'] > userScore['repaid']) {
      return this.decision = 'Ще се свържем с Вас!';
    } else if (userScore['late'] > userScore['intime']) {
      return this.decision = 'Ще се свържем с Вас!';
    } else if (userScore['rejected'] > 90) {
      return this.decision = 'Не сте одобрен, за повече информация, може да се свържете с нас директно!';
    } else {
      return this.decision = 'Не сте одобрен, за повече информация, може да се свържете с нас директно!';
    }

  }



}
