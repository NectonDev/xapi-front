import {Component, Input} from '@angular/core';
import {Account} from '../models/account';
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'account',
  templateUrl: './html/account.component.html',
  styleUrls: ['./css/account.component.css'],
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
}
