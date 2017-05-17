import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ExchangeRateService {

  constructor(private http: Http) { }

  public getExchangeRateFromToCurrency(from: string, to: string): Promise<number> {
    return new Promise(resolve => {
      this.http.get(`http://api.fixer.io/latest?base=${from}`).subscribe((response) => {
        resolve(response.json().rates[to]);
      });
    });
  }
}
