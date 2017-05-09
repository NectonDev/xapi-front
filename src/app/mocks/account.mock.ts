import { Account } from '../models/account';
export const ACCOUNTS: Account[] = [
  new Account('EUR', 'bank', 1000, '1111-1111-1111-1111', 'Main Account'),
  new Account('GBP', 'bank', 201, '1111-1111-1111-1111', 'Spare Money'),
  new Account('GBP', 'card', 999, '2222-3333-4444-5555', 'Credit Card'),
  new Account('EUR', 'card', 726, '1111-1111-1111-1111', 'Other Card'),
  new Account('GBP', 'card', 999, '1111-1111-1111-1523', 'Debit Card')
];
