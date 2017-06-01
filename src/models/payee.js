"use strict";
var account_1 = require("./account");
var Recipient = (function () {
    function Recipient(name, account) {
        if (name && account && account.getAccountType() === account_1.Account.ACCOUNT_BANK) {
            this.name = name;
            this.account = account;
        }
        else {
            throw new DOMException();
        }
    }
    Recipient.prototype.getName = function () {
        return this.name;
    };
    Recipient.prototype.getAccount = function () {
        return new account_1.Account(this.account.getCurrencyType(), this.account.getAccountType(), this.account.getCredit(), this.account.getNumber(), this.account.getName());
    };
    return Recipient;
}());
exports.Recipient = Recipient;
//# sourceMappingURL=payee.js.map
