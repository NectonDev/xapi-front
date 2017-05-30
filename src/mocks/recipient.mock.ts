import {Recipient} from '../models/recipient';
import {Account} from '../models/account';

export const RECIPIENTS: Recipient[] = [
  new Recipient('dadwd Shelton', new Account('GBP', 'bank', 'United Kingdom', 'gb', 201, '1111-1111-1111-1111', 'Spare Money')),
  new Recipient('Roderick Shelton', new Account('EUR', 'bank', 'Spain', 'es', 1000, '1111-1111-1111-1111', 'Main Account')),
  new Recipient('Roderick Shelton', new Account('GBP', 'bank', 'United States', 'us', 201, '1111-1111-1111-1111', 'Spare Money')),
  new Recipient('Roderick Shelton', new Account('GBP', 'card', 'United States', 'us', 999, '1111-1111-1111-1523', 'Debit Card')),
  new Recipient('Roderick Shelton', new Account('EUR', 'bank', 'Spain', 'es', 1000, '1111-1111-1111-1111', 'Main Account'))
];
