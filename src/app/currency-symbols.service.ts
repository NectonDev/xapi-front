import { Injectable } from '@angular/core';
import { MAP } from '../constants/currency-symbols-map';

@Injectable()
export class CurrencySymbolsService {
  currencySymbolsMap = MAP;

  public getSymbolFor(currency: string) {
    return this.currencySymbolsMap[currency.toUpperCase()];
  }
}
