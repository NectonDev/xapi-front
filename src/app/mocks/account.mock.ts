import { Account } from '../models/account';
export const ACCOUNTS: Account[] = [
  new Account('EUR', 'bank', 1000, 'Main Account'),
  new Account('GBP', 'bank', 201, 'Spare Money'),
  new Account('GBP', 'card', 999, 'Credit Card'),
  new Account('EUR', 'card', 726, 'Other Card'),
  new Account('GBP', 'card', 999, 'Debit Card')
];
