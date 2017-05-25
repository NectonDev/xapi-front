import {Account} from './account';

export class Recipient {
  private name: string;
  private account: Account;

  constructor(name: string, account: Account) {
    this.name = name;
    this.account = account;
  }

  public getName(): string {
    return this.name;
  }

  public getAccount(): Account {
    return new Account(
      this.account.getCurrencyType(),
      this.account.getAccountType(),
      this.account.getCountry(),
      this.account.getCredit(),
      this.account.getNumber(),
      this.account.getName()
    );
  }
}
