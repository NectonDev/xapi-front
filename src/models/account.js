"use strict";
var Account = (function () {
    function Account(currencyType, accountType, credit, number, name) {
        if (Account.CURRENCY_TYPES.has(currencyType) &&
            Account.ACCOUNT_TYPES.has(accountType) &&
            name && name.trim().length !== 0 &&
            number && number.trim().length !== 0) {
            this.currencyType = currencyType;
            this.accountType = accountType;
            this.credit = credit;
            this.number = number;
            this.name = name;
        }
        else {
            throw new DOMException();
        }
    }
    Account.prototype.getCurrencyType = function () {
        return this.currencyType;
    };
    Account.prototype.getAccountType = function () {
        return this.accountType;
    };
    Account.prototype.getCredit = function () {
        return this.credit;
    };
    Account.prototype.getNumber = function () {
        return this.number;
    };
    Account.prototype.getName = function () {
        return this.name;
    };
    Account.prototype.getCurrencySymbol = function () {
        return Account.CURRENCY_TYPES.get(this.currencyType);
    };
    Account.prototype.getAccountTypeIcon = function () {
        return Account.ACCOUNT_TYPES.get(this.accountType);
    };
    Account.prototype.getLastDigits = function () {
        return this.number.substring(this.number.length - 4, this.number.length);
    };
    Account.prototype.addCredit = function (amount) {
        this.credit += amount;
    };
    Account.prototype.takeCredit = function (amount) {
        this.credit -= amount;
    };
    return Account;
}());
Account.ACCOUNT_BANK = 'bank';
Account.ACCOUNT_CARD = 'card';
Account.CURRENCY_TYPES = new Map()
    .set('GBP', '£')
    .set('EUR', '€');
Account.ACCOUNT_TYPES = new Map()
    .set(Account.ACCOUNT_BANK, 'glyphicon-piggy-bank')
    .set(Account.ACCOUNT_CARD, 'glyphicon-credit-card');
exports.Account = Account;
//# sourceMappingURL=account.js.map