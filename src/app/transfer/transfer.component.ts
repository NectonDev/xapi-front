import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExchangeRateService} from '../exchange-rate.service';
import {Account} from '../../models/account';
import {Payee} from '../../models/payee';
import {CurrencySymbolsService} from '../currency-symbols.service';
import {PopupService} from '../popup.service';

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
  popupService: PopupService;

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

  // otherAccount getter and setter
  @Input()
  get otherAccount(): Account {
    return this._otherAccount;
  }
  @Output() otherAccountChange: EventEmitter<Account> = new EventEmitter();
  set otherAccount(value: Account) {
    this._otherAccount = value;
    this.otherAccountChange.emit(value);
  }

  get fromCredit(): string {
    return this._fromCredit;
  }
  @Output() fromCreditChange: EventEmitter<string> = new EventEmitter();
  set fromCredit(value: string) {
    value = value.replace(',', '.');
    this._fromCredit = value;
    this.calculateToCredit();
    this.fromCreditChange.emit(this._fromCredit);
  }

  get toCredit(): string {
    return this._toCredit;
  }
  @Output() toCreditChange: EventEmitter<string> = new EventEmitter();
  set toCredit(value: string) {
    value = value.replace(',', '.');
    this._toCredit = value;
    this.calculateFromCredit();
    this.toCreditChange.emit(this._toCredit);
  }

  @Input()
  get fromCurrency(): string {
    return this._fromCurrency;
  }
  @Output() fromCurrencyChange: EventEmitter<string> = new EventEmitter();
  set fromCurrency(value: string) {
    this._fromCurrency = value;
    this.fromCurrencyChange.emit(this._fromCurrency);
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  @Input()
  get toCurrency(): string {
    return this._toCurrency;
  }
  @Output() toCurrencyChange: EventEmitter<string> = new EventEmitter();
  set toCurrency(value: string) {
    this._toCurrency = value;
    this.toCurrencyChange.emit(this._toCurrency);
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency).then(() => {
      this.calculateToCredit();
    });
  }

  constructor(exchangeRateService: ExchangeRateService,
              currencySymbolsService: CurrencySymbolsService,
              popupService: PopupService) {
    this.currencySymbolsService = currencySymbolsService;
    this.popupService = popupService;
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
    this.toCreditChange.emit(this._toCredit);
  }

  calculateFromCredit() {
    this._fromCredit = !this._toCredit  ? this._toCredit  :
      (Number.parseFloat(this._toCredit ) / this.exchangeRate).toFixed(4).toString();
    this.fromCreditChange.emit(this._fromCredit);
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

  onReviewTransfer() {
    this.popupService.changeOption('review');
  }
}
