import {Recipient} from '../models/recipient';
import {Account} from '../models/account';

export const RECIPIENTS: Recipient[] = [
  new Recipient('Roderick Shelton', new Account('EUR', Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
  new Recipient('Walter Harford', new Account('GBP', Account.ACCOUNT_BANK, 875, '2222-2222-2222-2222', 'Main account'))
];
