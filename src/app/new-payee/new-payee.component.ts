import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Payee } from '../../models/payee';
import { Account } from '../../models/account';
import { Iban } from '../../models/iban';
import { IBAN } from '../../mocks/iban.mock';
import { PAYEES } from '../../mocks/payee.mock';

@Component({
  selector: 'app-new-payee',
  templateUrl: './new-payee.component.html',
  styleUrls: ['./new-payee.component.css']
})
export class NewRecipientComponent {
  countryFlags = new Map();
  @Input() selectedCountry = '';
  @Output() submitNewRecipient: EventEmitter<Payee> = new EventEmitter();
  _name: string;
  _address: string;
  _save: boolean;
  _iban: string;
  routingNumber: string;
  accountNumber: string;
  sortCode: string;
  ibanObject: Iban;
  ibanValid: boolean;
  payeeNameValidationError: boolean;
  ibanValidationError: boolean;
  routingNumberValidationError: boolean;
  accountNumberValidationError: boolean;
  sortCodeValidationError: boolean;

  // iban getter and setter
  get iban(): string {
    return this._iban;
  }
  set iban(value: string) {
    this._iban = value;
  }

  // save getter and setter
  get save(): boolean {
    return this._save;
  }
  set save(value: boolean) {
    this._save = value;
  }

  // address getter and setter
  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }

  // name getter and setter
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  constructor() {
    this.countryFlags.set('Spain', 'es');
    this.countryFlags.set('India', 'in');
    this.countryFlags.set('United States', 'us');
    this.countryFlags.set('United Kingdom', 'gb');
  }

  isSelected(country: string): boolean {
    if (this.selectedCountry) {
      return this.selectedCountry === country;
    }
    return false;
  }

  hasSelection(): boolean {
    return !!this.selectedCountry;
  }

  onSubmit() {
    if (!this._name || this._name.length === 0) {
      this.payeeNameValidationError = true;
    } else {
      this.payeeNameValidationError = false;
      const newRecipient = new Payee(this._name, new Account(
        'EUR',
        Account.ACCOUNT_BANK,
        this.selectedCountry,
        this.countryFlags.get(this.selectedCountry),
        1000,
        '1234567890',
        'Personal Account'
      ));
      this.submitNewRecipient.emit(newRecipient);
      if (this._save === true) {
        PAYEES.push(newRecipient);
      }
    }
  }

  checkIban() {
    const ibanIsEmpty = !this._iban || this._iban.length === 0;
    const sortCodeIsEmpty = !this.sortCode || this.sortCode.length === 0;
    const accountNumberIsEmpty = !this.accountNumber || this.accountNumber.length === 0;
    const routingNumberIsEmpty = !this.routingNumber || this.routingNumber.length === 0;
    let valid = true;
    switch (this.selectedCountry.toLowerCase()) {
      case 'spain': case 'india':
        this.ibanValidationError = ibanIsEmpty;
        valid = !ibanIsEmpty;
        break;
      case 'united kingdom':
        this.sortCodeValidationError = sortCodeIsEmpty;
        this.accountNumberValidationError = accountNumberIsEmpty;
        valid = !sortCodeIsEmpty && !accountNumberIsEmpty;
        break;
      case 'united states':
        this.routingNumberValidationError = routingNumberIsEmpty;
        this.accountNumberValidationError = accountNumberIsEmpty;
        valid = !routingNumberIsEmpty && !accountNumberIsEmpty;
        break;
    }
    if (!valid) {
      return;
    }
    this.ibanValid = true;
    this.ibanObject = IBAN;
  }
}
