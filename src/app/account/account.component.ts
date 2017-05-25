import {Component, Input} from '@angular/core';
import {Account} from '../../models/account';
import {state, style, trigger} from '@angular/animations';
import {CurrencySymbolsService} from '../currency-symbols.service';
import {CurrencyFlagsService} from "../currency-flags.service";

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
  currencySymbolsService: CurrencySymbolsService;
  currencyFlagsService: CurrencyFlagsService;

  constructor(currencySymbolsService: CurrencySymbolsService, currencyFlagsService: CurrencyFlagsService) {
    this.currencySymbolsService = currencySymbolsService;
    this.currencyFlagsService = currencyFlagsService;
  }
}
