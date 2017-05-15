import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Recipient} from '../../models/recipient';
import {Account} from '../../models/account';
import {Iban} from '../../models/iban';
import {IBAN} from '../../mocks/iban.mock';

@Component({
  selector: 'new-recipient',
  templateUrl: './new_recipient.component.html',
  styleUrls: ['./new_recipient.component.css']
})
export class NewRecipientComponent {

  @Input() selectedCountry: string;
  @Output() submitNewRecipient: EventEmitter<Recipient> = new EventEmitter();
  @ViewChild('name') name: ElementRef;
  @ViewChild('surname') surname: ElementRef;
  @ViewChild('address') address: ElementRef;
  private iban: Iban;

  private isSelected(country: string): boolean {
    if (this.selectedCountry) {
      return this.selectedCountry === country;
    }
    return false;
  }

  private hasSelection(): boolean {
    return !!this.selectedCountry;
  }

  private onSubmit() {
    let name = this.name.nativeElement.value;
    let surname = this.surname.nativeElement.value;
    let address = this.address.nativeElement.value;
    this.submitNewRecipient.emit(new Recipient(`${name} ${surname}`, new Account(
      'EUR', Account.ACCOUNT_BANK, 1000, '1234567890', 'Personal Account'
    )));
  }

  private checkIban() {
    this.iban = IBAN;
  }
}
