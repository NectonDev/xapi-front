import {Account} from './account';

export class Recipient {
  private name: string;
  private account: Account;

  constructor(name: string, account: Account) {
    if (name && account && account.getAccountType() === Account.ACCOUNT_BANK) {
      this.name = name;
      this.account = account;
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
}
