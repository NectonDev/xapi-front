"use strict";
var recipient_1 = require("../models/payee");
var account_1 = require("../models/account");
exports.RECIPIENTS = [
    new recipient_1.Payee('dadwd Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
    new recipient_1.Payee('Roderick Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
    new recipient_1.Payee('Roderick Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
    new recipient_1.Payee('Roderick Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
    new recipient_1.Payee('Roderick Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account')),
    new recipient_1.Payee('Roderick Shelton', new account_1.Account('EUR', account_1.Account.ACCOUNT_BANK, 222, '1111-1111-1111-1111', 'Main account'))
];
//# sourceMappingURL=payee.mock.js.map
