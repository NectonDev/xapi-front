import {Payee} from '../models/payee';
import {Account} from '../models/account';

export const PAYEES: Payee[] = [
  new Payee('dadwd Shelton', new Account('GBP', 'bank', 'United Kingdom', 'gb', 201, '1111-1111-1111-1111', 'Spare Money')),
  new Payee('Roderick Shelton', new Account('EUR', 'bank', 'Spain', 'es', 1000, '1111-1111-1111-1111', 'Main Account')),
  new Payee('Roderick Shelton', new Account('GBP', 'bank', 'United States', 'us', 201, '1111-1111-1111-1111', 'Spare Money')),
  new Payee('Roderick Shelton', new Account('GBP', 'card', 'United States', 'us', 999, '1111-1111-1111-1523', 'Debit Card')),
  new Payee('Roderick Shelton', new Account('EUR', 'bank', 'Spain', 'es', 1000, '1111-1111-1111-1111', 'Main Account'))
];
