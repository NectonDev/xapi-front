import { Component } from '@angular/core';
import { Account } from '../models/account';
import { Payee } from '../models/payee';
import {PopupService} from './popup.service';
import {StepManagerService} from './step-manager.service';
import {StepSelection} from './step/step.component';
import {TransactionService} from './transaction.service';
import {CurrencySymbolsService} from "./currency-symbols.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  popupService: PopupService;
  stepManagerService: StepManagerService;
  currencySymbolsService: CurrencySymbolsService;

  _payee: Payee;
  _account: Account;

  transactionFinalAmount: number;
  transactionTransferAmount: number;
  transactionPaymentType: string;
  transactionFeesPaymentMode: string;
  transactionFromCurrency: string;
  transactionToCurrency: string;

  payeeSelectedProperties = [];
  accountSelectedProperties = [];
  formSelectedProperties = [];
  configurationsSelectedProperties = [];

  constructor(popupService: PopupService,
              stepManagerService: StepManagerService,
              transactionService: TransactionService,
              currencySymbolsService: CurrencySymbolsService) {
    this.popupService = popupService;
    this.stepManagerService = stepManagerService;
    this.currencySymbolsService = currencySymbolsService;
    transactionService.addOnFinalAmountChangeListener((finalAmount: number) => {
      this.transactionFinalAmount = finalAmount;
      this.updateFormSelectedProperties();
    });
    transactionService.addOnTransferAmountChangeListener((transferAmount: number) => {
      this.transactionTransferAmount = transferAmount;
      this.updateFormSelectedProperties();
    });
    transactionService.addOnPaymentTypeChangeListener((paymentType: string) => {
      this.transactionPaymentType = paymentType;
      this.updateFormSelectedProperties();
    });
    transactionService.addOnFromCurrencyChangeListener((currency: string) => {
      this.transactionFromCurrency = currency;
      this.updateFormSelectedProperties();
    });
    transactionService.addOnToCurrencyChangeListener((currency: string) => {
      this.transactionToCurrency = currency;
      this.updateFormSelectedProperties();
    });
  }

  // payee setter and getter
  get payee(): Payee {
    return this._payee;
  }

  set payee(value: Payee) {
    this._payee = value;
    if (!!value) {
      this.payeeSelectedProperties = [
        new StepSelection(this.capitalizeString(value.getName()), `(${this.capitalizeString(value.getAccount().getCountry())})`),
      ];
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
      this.accountSelectedProperties = [
        new StepSelection(value.getName(), `(${value.getLastDigits()}) ${value.getCurrencyType().toUpperCase()}`)
      ];
      this.stepManagerService.doProgress('formFill');
    }
  }

  updateFormSelectedProperties() {
    if (!this.transactionToCurrency || !this.transactionFromCurrency || !this.payee ||
      !this.transactionFinalAmount || !this.transactionTransferAmount) {
      return;
    }
    const finalAmount = this.currencySymbolsService.getSymbolFor(this.transactionFromCurrency) +
      this.transactionTransferAmount.toString();
    const transferAmount = this.currencySymbolsService.getSymbolFor(this.transactionToCurrency) +
      this.transactionFinalAmount.toString();
    const payeeName = this.payee.getName();
    this.formSelectedProperties = [
      new StepSelection(`${finalAmount}`, `(${this.transactionPaymentType}) ${transferAmount} => ${payeeName}`)
    ];
  }

  capitalizeString(value: string): string {
    const splits = value.split(' ');
    let retString = '';
    for (let i = 0; i < splits.length; i++) {
      retString += splits[i].charAt(0).toUpperCase() + splits[i].substr(1, splits[i].length - 1) + ' ';
    }
    return retString.trim();
  }
}
