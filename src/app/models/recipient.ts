import {Account} from './account';

export class Recipient {

  private static RECIPIENTS: Recipient[] = [];
  private name: string;
  private account: Account;
  private state: string;

  constructor(name: string, account: Account) {
    if (name && account && account.getAccountType() === Account.ACCOUNT_BANK) {
      this.name = name;
      this.account = account;
      Recipient.RECIPIENTS.push(this);
    } else {
      throw new DOMException();
    }
  }

  public getName(): string {
    return this.name;
  }

  public getAccount(): Account {
    return new Account(
      this.account.getCurrencyType(),
      this.account.getAccountType(),
      this.account.getCredit(),
      this.account.getNumber(),
      this.account.getName()
    );
  }

  public getState(): string {
    return this.state;
  }

  public select(): void {
    this.state = 'selected';
    for (let i = 0; i < Recipient.RECIPIENTS.length; i++) {
      let recipient: Recipient = Recipient.RECIPIENTS[i];
      if (recipient !== this) {
        recipient.deselect();
      }
    }
  }

  public deselect(): void {
    this.state = 'deselected';
  }
}
