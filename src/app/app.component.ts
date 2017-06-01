import { Component } from '@angular/core';
import { Account } from '../models/account';
import { Payee } from '../models/payee';
import { StepComponent } from './step/step.component';
import {PopupService} from './popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  _recipient: Payee;
  _account: Account;
  stepIndex = 1;
  progressIndex = 1;
  popupService: PopupService;
  transactionFromCredit: string;
  transactionToCredit: string;
  transactionFromCurrency: string;
  transactionToCurrency: string;

  // payee setter and getter
  get recipient(): Payee {
    return this._recipient;
  }
  set recipient(value: Payee) {
    this._recipient = value;
    if (!!value) {
      this.doProgress(1);
    }
  }

  // account getter and setter
  get account(): Account {
    return this._account;
  }
  set account(value: Account) {
    this._account = value;
    if (!!value) {
      this.doProgress(2);
    }
  }

  constructor(popupService: PopupService) {
    this.popupService = popupService;
  }

  updateFromCredit(fromCredit: string) {
    this.transactionFromCredit = fromCredit;
  }

  updateToCredit(toCredit: string) {
    this.transactionToCredit = toCredit;
  }

  updateFromCurrency(fromCurrency: string) {
    this.transactionFromCurrency = fromCurrency;
  }

  updateToCurrency(toCurrency: string) {
    this.transactionToCurrency = toCurrency;
  }

  doProgress(step: number): void {
    if (this.progressIndex === step) {
      this.progressIndex++;
    }
    this.onStepClick(step + 1);
  }

  onStepClick(step: number): void {
    if (step <= this.progressIndex && step <= StepComponent.STEP_COUNT) {
      this.stepIndex = step;
    }
  }
}
