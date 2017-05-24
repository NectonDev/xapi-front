export class Account {

  static ACCOUNT_BANK = 'bank';
  static ACCOUNT_CARD = 'card';
  static ACCOUNT_TYPES = new Map()
    .set(Account.ACCOUNT_BANK, 'glyphicon-piggy-bank')
    .set(Account.ACCOUNT_CARD, 'glyphicon-credit-card');

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
    this.currencyType = currencyType;
    this.accountType = accountType;
    this.credit = credit;
    this.number = number;
    this.name = name;
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
}
