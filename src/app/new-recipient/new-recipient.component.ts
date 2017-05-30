import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Recipient} from '../../models/recipient';
import {Account} from '../../models/account';
import {Iban} from '../../models/iban';
import {IBAN} from '../../mocks/iban.mock';
import {RECIPIENTS} from "../../mocks/recipient.mock";

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.css']
})
export class NewRecipientComponent {
  countryFlags = new Map();
  @Input() selectedCountry = '';
  @Output() submitNewRecipient: EventEmitter<Recipient> = new EventEmitter();
  private _name: string;
  private _address: string;
  private _save: boolean;
  private _iban: Iban;
  private ibanValid: boolean;

  // iban getter and setter
  get iban(): Iban {
    return this._iban;
  }
  set iban(value: Iban) {
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
    const newRecipient = new Recipient(this._name, new Account(
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
      RECIPIENTS.push(newRecipient);
    }
  }

  checkIban() {
    this._iban = IBAN;
  }
}
