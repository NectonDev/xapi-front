import { Account } from '../models/account';
export const ACCOUNTS: Account[] = [
  new Account('EUR', 'bank', 'Spain', 1000, '1111-1111-1111-1111', 'Main Account'),
  new Account('GBP', 'bank', 'United Kingdom', 201, '1111-1111-1111-1111', 'Spare Money'),
  new Account('GBP', 'card', 'Spain', 999, '2222-3333-4444-5555', 'Credit Card'),
  new Account('EUR', 'card', 'United Kingdom', 726, '1111-1111-1111-1111', 'Other Card'),
  new Account('GBP', 'card', 'United States', 999, '1111-1111-1111-1523', 'Debit Card'),
  new Account('EUR', 'bank', 'Spain', 1000, '1111-1111-1111-1111', 'Main Account'),
  new Account('GBP', 'bank', 'United States', 201, '1111-1111-1111-1111', 'Spare Money')
];
