import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {ExchangeRateService} from '../../services/exchange_rate.service';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [ ExchangeRateService ]
})
export class TransferComponent {
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
  private selectedRadioButtonId: number;

  constructor(private exchangeRateService: ExchangeRateService) {
    this.setRadioButtonSelected(1);
    this.setSantanderFee('fast');
    this.setExchangeRateFromToCurrency('GBP', 'EUR');
  }

  private setExchangeRateFromToCurrency(from: string, to: string) {
    this.exchangeRateService.getExchangeRateFromToCurrency(from, to).then(rate => {
      this.exchangeRate = rate;
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
}
