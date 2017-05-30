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
  defaultFeesPaymentModesPerCountry = {
    'united states': 'shared'
  };
  _account: Account;
  _otherAccount: Account;
  _recipient: Recipient;
  _fromCredit: string;
  _toCredit: string;
  _fromCurrency: string;
  _toCurrency: string;
  feesPaymentMode = 'sender';
  currencyMap = new Map();
  eta: string;
  santanderFee: number;
  exchangeRate: number;
  selectedRbPaymentType: number;
  selectedRbAdvanced: number;
  showingAdvancedOptions = false;
  exchangeRateService: ExchangeRateService;
  currencySymbolsService: CurrencySymbolsService;
  useFeesAccount: boolean;
  feesAccount: Account;
  @Output() onOperationDone: EventEmitter<any> = new EventEmitter();

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
      console.log(value);
      console.log(value.getAccount());
      this.toCurrency = value.getAccount().getCurrencyType();
      let feesPaymentMode;
      if ((feesPaymentMode = this.defaultFeesPaymentModesPerCountry[value.getAccount().getCountry().toLowerCase()])) {
        this.feesPaymentMode = feesPaymentMode;
      }
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

  // fromCredit getter and setter
  get fromCredit(): string {
    if (!this._fromCredit) {
      return '';
    } else {
      return this.currencySymbolsService.getSymbolFor(this._fromCurrency) + this._fromCredit;
    }
  }
  set fromCredit(value: string) {
    value = value.trim();
    if (!!value && value.length > 0 && !isNumeric(value)) {
      value = value.substr(1, value.length - 1);
    }
    if (!value || value.length === 0) {
      value = '';
    }
    const previousCredit = this._fromCredit;
    this._fromCredit = !this._fromCredit ? ' ' : this._fromCredit + ' ';
    setTimeout(() => {
      this._fromCredit = (!isNumeric(value) && value !== '' ? previousCredit.trim() : value);
      this.calculateToCredit();
    }, 1);
  }

  // toCredit getter and setter
  get toCredit(): string {
    if (!this._toCredit) {
      return '';
    } else {
      return this.currencySymbolsService.getSymbolFor(this._toCurrency) + this._toCredit;
    }
  }
  set toCredit(value: string) {
    value = value.trim();
    if (!!value && value.length > 0 && !isNumeric(value)) {
      value = value.substr(1, value.length - 1);
    }
    if (!value || value.length === 0) {
      value = '';
    }
    const previousCredit = this._toCredit;
    this._toCredit = !this._toCredit ? ' ' : this._toCredit + ' ';
    setTimeout(() => {
      this._toCredit = (!isNumeric(value) && value !== '' ? previousCredit.trim() : value);
      this.calculateFromCredit();
    }, 1);
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
      (Number.parseFloat(this._fromCredit ) * this.exchangeRate).toFixed(2).toString();
  }

  calculateFromCredit() {
    this._fromCredit = !this._toCredit  ? this._toCredit  :
      (Number.parseFloat(this._toCredit ) / this.exchangeRate).toFixed(2).toString();
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
