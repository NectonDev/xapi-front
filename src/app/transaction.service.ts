import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {
  onFinalAmountChangeListener: ((amount: number) => any)[] = [];
  onTransferAmountChangeListener: ((amount: number) => any)[] = [];
  onPaymentTypeChangeListener: ((type: string) => any)[] = [];
  onFromCurrencyChangeListener: ((currency: string) => any)[] = [];
  onToCurrencyChangeListener: ((currency: string) => any)[] = [];
  private _paymentType: string;
  private _transferAmount: number;
  private _finalAmount: number;
  private _fromCurrency: string;
  private _toCurrency: string;

  get finalAmount(): number {
    return this._finalAmount;
  }
  set finalAmount(value: number) {
    this._finalAmount = value;
    for (let i = 0; i < this.onFinalAmountChangeListener.length; i++) {
      this.onFinalAmountChangeListener[i](value);
    }
  }

  get transferAmount(): number {
    return this._transferAmount;
  }
  set transferAmount(value: number) {
    this._transferAmount = value;
    for (let i = 0; i < this.onTransferAmountChangeListener.length; i++) {
      this.onTransferAmountChangeListener[i](value);
    }
  }

  get paymentType(): string {
    return this._paymentType;
  }
  set paymentType(value: string) {
    this._paymentType = value;
    for (let i = 0; i < this.onPaymentTypeChangeListener.length; i++) {
      this.onPaymentTypeChangeListener[i](value);
    }
  }

  get toCurrency(): string {
    return this._toCurrency;
  }
  set toCurrency(value: string) {
    this._toCurrency = value;
    for (let i = 0; i < this.onToCurrencyChangeListener.length; i++) {
      this.onToCurrencyChangeListener[i](value);
    }
  }

  get fromCurrency(): string {
    return this._fromCurrency;
  }
  set fromCurrency(value: string) {
    this._fromCurrency = value;
    for (let i = 0; i < this.onFromCurrencyChangeListener.length; i++) {
      this.onFromCurrencyChangeListener[i](value);
    }
  }

  public addOnFinalAmountChangeListener(listener: (amount: number) => any) {
    this.onFinalAmountChangeListener.push(listener);
  }
  public addOnTransferAmountChangeListener(listener: (amount: number) => any) {
    this.onTransferAmountChangeListener.push(listener);
  }
  public addOnPaymentTypeChangeListener(listener: (type: string) => any) {
    this.onPaymentTypeChangeListener.push(listener);
  }
  public addOnFromCurrencyChangeListener(listener: (currency: string) => any) {
    this.onFromCurrencyChangeListener.push(listener);
  }
  public addOnToCurrencyChangeListener(listener: (currency: string) => any) {
    this.onToCurrencyChangeListener.push(listener);
  }
}
