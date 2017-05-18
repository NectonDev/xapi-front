import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { ACCOUNTS } from '../../mocks/account.mock';
import { Account } from '../../models/account';

@Component({
  selector: 'account-selector',
  templateUrl: './account_selector.component.html',
  styleUrls: ['./account_selector.component.css']
})
export class AccountSelectorComponent implements AfterViewInit {
  @ViewChild('accountList') accountList: ElementRef;
  @ViewChild('accountListContainer') accountListContainer: ElementRef;
  private listOffset = 0;
  private listWidth: number;
  private listContainerWidth: number;
  private accounts: Account[] = ACCOUNTS;
  private selectedAccount: Account;
  @Output() onSelectChange: EventEmitter<Account> = new EventEmitter();

  ngAfterViewInit() {
    this.updateComputedValues();
  }

  onAccountClick(account: Account): void {
    this.onSelectChange.emit(account);
    this.selectedAccount = account;
  }

  private scrollList(direction: number) {
    this.updateComputedValues();
    this.listOffset += Math.round(this.listContainerWidth / 2) * direction;
    let maxOffset = this.listWidth + 20 - this.listContainerWidth;
    let offsetIsOverTheLimit = this.listOffset > maxOffset;
    let offsetUnderZero = this.listOffset < 0;
    this.listOffset = offsetIsOverTheLimit ? maxOffset : offsetUnderZero ? 0 : this.listOffset;
    this.accountList.nativeElement.style.marginLeft = `${-this.listOffset}px`;
  }

  private updateComputedValues() {
    this.listWidth = Number.parseInt(window.getComputedStyle(this.accountList.nativeElement).width);
    this.listContainerWidth = Number.parseInt(window.getComputedStyle(this.accountListContainer.nativeElement).width);
  }

  private onWindowResize() {
    this.updateComputedValues();
  }

  private isScrollNeeded(): boolean {
    let listWith = !this.listWidth ? 1 : this.listWidth;
    let listContainerWidth = !this.listContainerWidth ? 1 : this.listContainerWidth;
    let retValue = listWith > listContainerWidth;
    if (!retValue) {
      this.accountList.nativeElement.style.marginLeft = '';
    }
    return retValue;
  }
}
