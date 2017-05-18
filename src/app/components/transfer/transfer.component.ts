import {Component, EventEmitter, Input, Output} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {ExchangeRateService} from '../../services/exchange_rate.service';
import {Account} from '../../models/account';
import {Recipient} from '../../models/recipient';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [ ExchangeRateService ]
})
export class TransferComponent {
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
  get fromCurrency(): string {
    return this._fromCurrency;
  }
  get toCurrency(): string {
    return this._toCurrency;
  }
  set toCurrency(value: string) {
    this._toCurrency = value;
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency);
  }
  set fromCurrency(value: string) {
    this._fromCurrency = value;
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency);
  }
  set toCredit(value: string) {
    if ((isNumeric(value) || !value) && value !== this._toCredit) {
      this._toCredit = value;
      this._fromCredit = !value ? value : (Number.parseFloat(value) / this.exchangeRate).toString();
    }
  }
  set fromCredit(value: string) {
    if ((isNumeric(value) || !value) && value !== this._fromCredit) {
      this._fromCredit = value;
      this._toCredit = !value ? value : (Number.parseFloat(value) * this.exchangeRate).toString();
    }
  }

  private eta: string;
  private santanderFee: number;
  private exchangeRate: number;
  @Output() onOperationDone: EventEmitter<any> = new EventEmitter();
  private _fromCredit: string;
  private _toCredit: string;
  private _fromCurrency: string;
  private _toCurrency: string;
  private selectedRadioButtonId: number;
  private showingAdvancedOptions: boolean = false;
  private isDelegatePayment: boolean;
  private isPayFeesWithDifferentAccount: boolean;
  private _account: Account;
  private _recipient: Recipient;

  constructor(private exchangeRateService: ExchangeRateService) {
    this.fromCurrency = 'EUR';
    this.toCurrency = 'GBP';
    this.setRadioButtonSelected(1);
    this.setSantanderFee('fast');
    console.log(this.fromCurrency);
    this.setExchangeRateFromToCurrency(this._fromCurrency, this._toCurrency);
  }

  private setExchangeRateFromToCurrency(from: string, to: string) {
    this.exchangeRateService.getExchangeRateFromToCurrency(from, to).then(rate => {
      this.exchangeRate = !rate ? 1 : rate;
    });
  }

  private setSantanderFee(method: string) {
    this.santanderFee = method === 'fast' ? 4.98 : 4.05;
    this.eta = method === 'fast' ? '5 hours' : '5 days';
  }

  private isRadioButtonSelected(id: number): boolean {
    return this.selectedRadioButtonId === id;
  }

  private setRadioButtonSelected(id: number) {
    this.selectedRadioButtonId = id;
  }

  private toggleAdvancedOptions() {
    this.showingAdvancedOptions = !this.showingAdvancedOptions;
  }

  private onAccountSelect(account: Account) {
    console.log(account.getName());
  }
}
