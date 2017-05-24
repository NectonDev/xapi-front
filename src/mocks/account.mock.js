"use strict";
var account_1 = require("../models/account");
exports.ACCOUNTS = [
    new account_1.Account('EUR', 'bank', 1000, '1111-1111-1111-1111', 'Main Account'),
    new account_1.Account('GBP', 'bank', 201, '1111-1111-1111-1111', 'Spare Money'),
    new account_1.Account('GBP', 'card', 999, '2222-3333-4444-5555', 'Credit Card'),
    new account_1.Account('EUR', 'card', 726, '1111-1111-1111-1111', 'Other Card'),
    new account_1.Account('GBP', 'card', 999, '1111-1111-1111-1523', 'Debit Card'),
    new account_1.Account('EUR', 'bank', 1000, '1111-1111-1111-1111', 'Main Account'),
    new account_1.Account('GBP', 'bank', 201, '1111-1111-1111-1111', 'Spare Money')
];
//# sourceMappingURL=account.mock.js.map