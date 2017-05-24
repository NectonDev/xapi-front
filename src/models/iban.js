"use strict";
var Iban = (function () {
    function Iban(account, address, bank, bic, branch, city, country, country_iso, email, fax, phone, state, www, zip, b2b, cor1, scc, sct, sdd) {
        this.account = account;
        this.address = address;
        this.bank = bank;
        this.bic = bic;
        this.branch = branch;
        this.city = city;
        this.country = country;
        this.country_iso = country_iso;
        this.email = email;
        this.fax = fax;
        this.phone = phone;
        this.state = state;
        this.www = www;
        this.zip = zip;
        this.b2b = b2b;
        this.cor1 = cor1;
        this.scc = scc;
        this.sct = sct;
        this.sdd = sdd;
    }
    return Iban;
}());
exports.Iban = Iban;
//# sourceMappingURL=iban.js.map