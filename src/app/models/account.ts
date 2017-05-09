export class Account {

  static ACCOUNT_BANK: string = 'bank';
  static ACCOUNT_CARD: string = 'card';
  static ACCOUNTS: Account[] = [];
  static CURRENCY_TYPES = new Map()
    .set('GBP', '£')
    .set('EUR', '€');
  static ACCOUNT_TYPES = new Map()
    .set(Account.ACCOUNT_BANK, 'glyphicon-piggy-bank')
    .set(Account.ACCOUNT_CARD, 'glyphicon-credit-card');

  private state: string = 'unselected';
  private currencyType: string;
  private accountType: string;
  private number: string;
  private credit: number;
  private name: string;

  constructor(currencyType: string,
              accountType: string,
              credit: number,
              number: string,
              name: string) {
    if (Account.CURRENCY_TYPES.has(currencyType) &&
        Account.ACCOUNT_TYPES.has(accountType) &&
        name && name.trim().length !== 0 &&
        number && number.trim().length !== 0) {
      this.currencyType = currencyType;
      this.accountType = accountType;
      this.credit = credit;
      this.number = number;
      this.name = name;
      Account.ACCOUNTS.push(this);
    } else {
      throw new DOMException();
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

  public getNumber(): string {
    return this.number;
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

  public getLastDigits(): string {
    return this.number.substring(this.number.length - 4, this.number.length);
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
