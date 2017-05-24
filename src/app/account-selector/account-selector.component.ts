import {
  AfterContentChecked,
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, Output,
  ViewChild
} from '@angular/core';
import { ACCOUNTS } from '../../mocks/account.mock';
import { Account } from '../../models/account';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements AfterContentChecked {
  accounts: Account[] = ACCOUNTS;
  @ViewChild('accountList') accountList: ElementRef;
  @ViewChild('accountListContainer') accountListContainer: ElementRef;
  listOffset = 0;
  listWidth: number;
  listContainerWidth: number;
  _isScrollNeeded: boolean;
  _selectedAccount: Account;
  constructor() {
    setInterval(() => {
      this.onWindowResize();
    }, 1000);
  }

  // selectedAccount setter and getter
  @Input()
  get selectedAccount(): Account {
    return this._selectedAccount;
  }
  @Output() selectedAccountChange: EventEmitter<Account> = new EventEmitter();
  set selectedAccount(account: Account) {
    this._selectedAccount = account;
    this.selectedAccountChange.emit(this._selectedAccount);
  }

  // callback after the content has been rendered
  ngAfterContentChecked() {
    this.listWidth = 160 * this.accounts.length - 10;
    this.updateComputedValues();
  }

  // callback after the window has changed its dimensions
  onWindowResize() {
    this.updateComputedValues();
  }

  // isScrollNeeded getter and setter
  get isScrollNeeded(): boolean {
    return this._isScrollNeeded;
  }
  set isScrollNeeded(value: boolean) {
    this._isScrollNeeded = value;
    if (!value) {
      this.accountList.nativeElement.style.marginLeft = '';
    }
  }

  // method used to update the list container width and determine whether or not scrolling is needed
  updateComputedValues() {
    this.listContainerWidth = Number.parseFloat(window.getComputedStyle(this.accountListContainer.nativeElement).width);
    this.isScrollNeeded = this.listWidth > this.listContainerWidth;
  }

  // method used to scroll the list by manipulating its left margin using negative values
  scrollList(direction: number) {
    this.listOffset += Math.round(this.listContainerWidth / 2) * direction;
    let maxOffset = this.listWidth + 20 - this.listContainerWidth;
    let offsetIsOverTheLimit = this.listOffset > maxOffset;
    let offsetUnderZero = this.listOffset < 0;
    this.listOffset = offsetIsOverTheLimit ? maxOffset : offsetUnderZero ? 0 : this.listOffset;
    this.accountList.nativeElement.style.marginLeft = `${-this.listOffset}px`;
  }
}
