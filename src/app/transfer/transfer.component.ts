import {Component, EventEmitter, Input, Output} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {ExchangeRateService} from '../exchange-rate.service';
import {Account} from '../../models/account';
import {Recipient} from '../../models/recipient';
import {CurrencySymbolsService} from '../currency-symbols.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [ ExchangeRateService ]
})
export class TransferComponent {
  currencyMap = new Map();
  eta: string;
  santanderFee: number;
  exchangeRate: number;
  @Output() onOperationDone: EventEmitter<any> = new EventEmitter();
  _fromCredit: string;
  _toCredit: string;
  _fromCurrency: string;
  _toCurrency: string;
  selectedRbPaymentType: number;
  selectedRbAdvanced: number;
  showingAdvancedOptions = false;
  _account: Account;
  _otherAccount: Account;
  _recipient: Recipient;
  exchangeRateService: ExchangeRateService;
  currencySymbolsService: CurrencySymbolsService;

  constructor(exchangeRateService: ExchangeRateService, currencySymbolsService: CurrencySymbolsService) {
    this.currencySymbolsService = currencySymbolsService;
    this.currencyMap.set('EUR', 'eur');
    this.currencyMap.set('GBP', 'gbp');
    this.currencyMap.set('USD', 'usd');
    this.exchangeRateService = exchangeRateService;
    this.fromCurrency = 'EUR';
    this.toCurrency = 'GBP';
    this.selectedRbPaymentType = 1;
    this.selectedRbAdvanced = 1;
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

  // account getter and setter
  @Input('account')
  get account(): Account {
    return this._account;
  }
  set account(value: Account) {
    this._account = value;
    if (!!value) {
      this.fromCurrency = value.getCurrencyType();
    }
  }

  // recipient getter and setter
  @Input('recipient')
  get recipient(): Recipient {
    return this._recipient;
  }
  set recipient(value: Recipient) {
    this._recipient = value;
    if (!!value) {
      this.toCurrency = value.getAccount().getCurrencyType();
    }
  }

  // fromCurrency getter and setter
  get fromCurrency(): string {
    return this._fromCurrency;
  }
  set fromCurrency(value: string) {
    this._fromCurrency = value.toUpperCase();
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  // toCurrency getter and setter
  get toCurrency(): string {
    return this._toCurrency;
  }
  set toCurrency(value: string) {
    this._toCurrency = value.toUpperCase();
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  // toCredit getter and setter
  get toCredit(): string {
    return this._toCredit;
  }
  set toCredit(value: string) {
    if ((isNumeric(value) || !value) && value !== this._toCredit) {
      this._toCredit = value;
      this.calculateFromCredit();
    }
  }

  // fromCredit getter and setter
  get fromCredit(): string {
    return this._fromCredit;
  }
  set fromCredit(value: string) {
    if ((isNumeric(value) || !value) && value !== this._fromCredit) {
      this._fromCredit = value;
      this.calculateToCredit();
    }
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
    this._toCredit = !this._fromCredit  ? this._fromCredit  :
      (Number.parseFloat(this._fromCredit ) * this.exchangeRate).toString();
  }

  calculateFromCredit() {
    this._fromCredit = !this._toCredit  ? this._toCredit  :
      (Number.parseFloat(this._toCredit ) / this.exchangeRate).toString();
  }

  isPaymentTypeRbSelected(id: number): boolean {
    return this.selectedRbPaymentType === id;
  }

  isAdvancedRbSelected(id: number): boolean {
    return this.selectedRbAdvanced === id;
  }

  toggleAdvancedOptions() {
    this.showingAdvancedOptions = !this.showingAdvancedOptions;
  }
}
