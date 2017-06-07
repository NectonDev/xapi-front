import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExchangeRateService} from '../exchange-rate.service';
import {Account} from '../../models/account';
import {Payee} from '../../models/payee';
import {CurrencySymbolsService} from '../currency-symbols.service';
import {PopupService} from '../popup.service';
import {StepManagerService} from '../step-manager.service';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [ ExchangeRateService ]
})
export class TransferComponent {
  defaultFeesPaymentModesPerCountry = {
    'united states': 'shared'
  };
  private _account: Account;
  private _recipient: Payee;
  private _otherAccount: Account;
  private _fromCredit: string;
  private _toCredit: string;
  private _fromCurrency: string;
  private _toCurrency: string;
  private _selectionIndex: number;
  private _selectedPaymentTypeIndex: number;

  feesPaymentMode = 'sender';
  eta: string;
  santanderFee: number;
  exchangeRate: number;
  exchangeRateService: ExchangeRateService;
  currencySymbolsService: CurrencySymbolsService;
  useFeesAccount: boolean;
  feesAccount: Account;
  popupService: PopupService;
  stepManagerService: StepManagerService;
  transactionService: TransactionService;
  currencyMap = new Map();

  // account getter and setter
  @Input()
  get account(): Account {
    return this._account;
  }
  @Output() accountChange: EventEmitter<Account> = new EventEmitter();
  set account(value: Account) {
    if (!!value) {
      this._account = value;
      this._fromCurrency = value.getCurrencyType().toUpperCase();
      this.accountChange.emit(value);
    }
  }

  // payee getter and setter
  @Input()
  get recipient(): Payee {
    return this._recipient;
  }
  @Output() recipientChange: EventEmitter<Payee> = new EventEmitter();
  set recipient(value: Payee) {
    if (!!value) {
      this._recipient = value;
      this._toCurrency = value.getAccount().getCurrencyType().toUpperCase();
      let feesPaymentMode;
      if ((feesPaymentMode = this.defaultFeesPaymentModesPerCountry[value.getAccount().getCountry().toLowerCase()])) {
        this.feesPaymentMode = feesPaymentMode;
      }
      this.recipientChange.emit(value);
    }
  }

  constructor(exchangeRateService: ExchangeRateService,
              currencySymbolsService: CurrencySymbolsService,
              popupService: PopupService,
              stepManagerService: StepManagerService,
              transactionService: TransactionService) {
    this.currencySymbolsService = currencySymbolsService;
    this.popupService = popupService;
    this.currencyMap.set('EUR', 'eur');
    this.currencyMap.set('GBP', 'gbp');
    this.currencyMap.set('USD', 'usd');
    this.exchangeRateService = exchangeRateService;
    this.stepManagerService = stepManagerService;
    this.transactionService = transactionService;
    this.fromCurrency = 'EUR';
    this.toCurrency = 'GBP';
    this.selectedPaymentTypeIndex = 0;
    this.setSantanderFee('fast');
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency);
  }

  // otherAccount getter and setter
  get otherAccount(): Account {
    return this._otherAccount;
  }
  set otherAccount(value: Account) {
    this._otherAccount = value;
  }

  get fromCredit(): string {
    return this._fromCredit;
  }
  set fromCredit(value: string) {
    value = value.replace(',', '.');
    this._fromCredit = value;
    this.calculateToCredit();
    this.transactionService.transferAmount = Number.parseFloat(value);
  }

  get toCredit(): string {
    return this._toCredit;
  }
  set toCredit(value: string) {
    value = value.replace(',', '.');
    this._toCredit = value;
    this.calculateFromCredit();
    this.transactionService.finalAmount = Number.parseFloat(value);
  }

  get fromCurrency(): string {
    return this._fromCurrency;
  }
  set fromCurrency(value: string) {
    this._fromCurrency = value;
    this.transactionService.fromCurrency = value;
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  get toCurrency(): string {
    return this._toCurrency;
  }
  set toCurrency(value: string) {
    this._toCurrency = value;
    this.transactionService.toCurrency = value;
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  // selectedPaymentTypeIndex getter and setter
  get selectedPaymentTypeIndex(): number {
    return this._selectedPaymentTypeIndex;
  }
  set selectedPaymentTypeIndex(value: number) {
    this._selectedPaymentTypeIndex = value;
    this.setSantanderFee(value === 0 ? 'fast' : 'cheap');
    this.transactionService.paymentType = value === 0 ? 'Fast' : 'Cheap';
  }

  setExchangeRateFromToCurrency(from: string, to: string): Promise<any> {
    const promise = this.exchangeRateService.getExchangeRateFromToCurrency(from, to);
    promise.then(rate => {
      this.exchangeRate = !rate ? 1 : rate;
    });
    return promise;
  }

  setSantanderFee(method: string) {
    this.santanderFee = method === 'fast' ? 4.98 : 4.05;
    this.eta = method === 'fast' ? '5 hours' : '5 days';
  }

  calculateToCredit() {
    this._toCredit = !this._fromCredit ? this._fromCredit  :
      (Number.parseFloat(this._fromCredit ) * this.exchangeRate).toFixed(4).toString();
    this.transactionService.finalAmount = Number.parseFloat(this._toCredit);
  }

  calculateFromCredit() {
    this._fromCredit = !this._toCredit  ? this._toCredit  :
      (Number.parseFloat(this._toCredit ) / this.exchangeRate).toFixed(4).toString();
    this.transactionService.transferAmount = Number.parseFloat(this._fromCredit);
  }
}
