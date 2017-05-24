import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Recipient} from '../../models/recipient';
import {Account} from '../../models/account';
import {Iban} from '../../models/iban';
import {IBAN} from '../../mocks/iban.mock';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.css']
})
export class NewRecipientComponent {
  countryFlags = new Map();
  @Input() selectedCountry = '';
  @Output() submitNewRecipient: EventEmitter<Recipient> = new EventEmitter();
  @ViewChild('name') name: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  iban: Iban;
  private ibanValid: boolean;
  constructor() {
    this.countryFlags.set('Spain', 'eur');
    this.countryFlags.set('India', 'usd');
    this.countryFlags.set('United States', 'usd');
    this.countryFlags.set('United Kingdom', 'gbp');
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
    const name = this.name.nativeElement.value;
    const surname = this.surname.nativeElement.value;
    this.submitNewRecipient.emit(new Recipient(`${name} ${surname}`, new Account(
      'EUR', Account.ACCOUNT_BANK, 1000, '1234567890', 'Personal Account'
    )));
  }

  checkIban() {
    this.iban = IBAN;
  }
}
