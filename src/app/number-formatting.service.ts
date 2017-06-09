import { Injectable } from '@angular/core';
import {first} from "rxjs/operator/first";

@Injectable()
export class NumberFormattingService {
  language: string;

  constructor() {
    this.language = navigator.language;
  }

  public parseNumber(number: string) {
    const lastIndexDot = number.lastIndexOf('.');
    const firstIndexDot = number.indexOf('.');
    const lastIndexComa = number.lastIndexOf(',');
    const firstIndexComa = number.indexOf(',');
    if (lastIndexDot !== -1 && lastIndexComa !== -1) {
      if (lastIndexDot > lastIndexComa) {
        number = number.replace(/,/gi, '');
      } else if (lastIndexDot < lastIndexComa) {
        number = number.replace(/\./gi, '').replace(',', '.');
      }
    } else {
      if (firstIndexDot !== lastIndexDot) {
        number = number.replace(/\./g, '');
      }
      if (firstIndexComa !== -1 && firstIndexComa === lastIndexComa) {
        number = number.replace(',', '.');
      } else {
        number = number.replace(/,/g, '');
      }
    }
    return Number.parseFloat(number);
  }

  public toLocaleString(num: number, minimumFractionDigits?: number, maximumFractionDigits?: number) {
    const options = {};
    if (!!minimumFractionDigits) {
      options['minimumFractionDigits'] = minimumFractionDigits;
    }
    if (!!maximumFractionDigits) {
      options['maximumFractionDigits'] = maximumFractionDigits;
    }
    return num.toLocaleString(this.language, options);
  }
}
