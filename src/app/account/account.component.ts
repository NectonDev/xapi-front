import {Component, Input} from '@angular/core';
import {Account} from '../../models/account';
import {state, style, trigger} from '@angular/animations';
import {CurrencySymbolsService} from '../currency-symbols.service';
import {NumberFormattingService} from '../number-formatting.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [
    trigger('headerState', [
      state('selected', style({
        background: '#FF0000',
        color: 'white'
      }))
    ])
  ]
})
export class AccountComponent {
  @Input() account: Account;
  @Input() accountSelected: boolean;
  css: CurrencySymbolsService;
  nfs: NumberFormattingService;

  constructor(currencySymbolsService: CurrencySymbolsService,
              numberFormattingService: NumberFormattingService) {
    this.css = currencySymbolsService;
    this.nfs = numberFormattingService;
  }
}
