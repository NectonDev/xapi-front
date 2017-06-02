import { Component } from '@angular/core';
import { Account } from '../models/account';
import { Payee } from '../models/payee';
import {PopupService} from './popup.service';
import {StepManagerService} from './step-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  popupService: PopupService;
  stepManagerService: StepManagerService;
  _recipient: Payee;
  _account: Account;
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
      this.stepManagerService.doProgress('accountSelect');
    }
  }

  // account getter and setter
  get account(): Account {
    return this._account;
  }
  set account(value: Account) {
    this._account = value;
    if (!!value) {
      this.stepManagerService.doProgress('formFill');
    }
  }

  constructor(popupService: PopupService, stepManagerService: StepManagerService) {
    this.popupService = popupService;
    this.stepManagerService = stepManagerService;
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
}
