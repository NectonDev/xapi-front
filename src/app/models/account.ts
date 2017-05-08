export class Account {

  static ACCOUNTS: Account[] = [];
  static CURRENCY_TYPES = new Map()
    .set('GBP', '£')
    .set('EUR', '€');
  static ACCOUNT_TYPES = new Map()
    .set('bank', 'glyphicon-piggy-bank')
    .set('card', 'glyphicon-credit-card');

  private state: string = 'unselected';
  private currencyType: string;
  private accountType: string;
  private credit: number;
  private name: string;

  constructor(currencyType: string,
              accountType: string,
              credit: number,
              name: string) {
    if (!Account.CURRENCY_TYPES.has(currencyType) ||
        !Account.ACCOUNT_TYPES.has(accountType) ||
        !name || name.trim().length === 0) {
      throw new DOMException();
    } else {
      this.currencyType = currencyType;
      this.accountType = accountType;
      this.credit = credit;
      this.name = name;
      Account.ACCOUNTS.push(this);
    }
  }

  public getState(): string {
    return this.state;
  }

  public getCurrencyType(): string {
    return this.currencyType;
  }

  public getAccountType(): string {
    return this.accountType;
  }

  public getCredit(): number {
    return this.credit;
  }

  public getName(): string {
    return this.name;
  }

  public getCurrencySymbol(): string {
    return Account.CURRENCY_TYPES.get(this.currencyType);
  }

  public getAccountTypeIcon(): string {
    return Account.ACCOUNT_TYPES.get(this.accountType);
  }

  public addCredit(amount: number): void {
    this.credit += amount;
  }

  public takeCredit(amount: number): void {
    this.credit -= amount;
  }

  public select(): void {
    this.state = 'selected';
    for (let i = 0; i < Account.ACCOUNTS.length; i++) {
      let account: Account = Account.ACCOUNTS[i];
      if (account !== this) {
        account.deselect();
      }
    }
  }

  public deselect(): void {
    this.state = 'deselected';
  }
}
