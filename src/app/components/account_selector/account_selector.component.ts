import {Component, EventEmitter, Output} from '@angular/core';
import { ACCOUNTS } from '../../mocks/account.mock';
import {Account} from '../../models/account';

@Component({
  selector: 'account-selector',
  templateUrl: './account_selector.component.html',
  styleUrls: ['./account_selector.component.css']
})
export class AccountSelectorComponent {
  private accounts: Account[] = ACCOUNTS;
  @Output() onSelectChange: EventEmitter<Account> = new EventEmitter();

  onAccountClick(account: Account): void {
    this.onSelectChange.emit(account);
    account.select();
  }
}
