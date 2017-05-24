import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Iban} from '../../models/iban';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css']
})
export class IbanComponent {

  // iban setter and getter
  @Input()
  get iban(): Iban {
    return this._iban;
  }
  set iban(value: Iban) {
    this._iban = value;
    this.isValid = true;
  }

  // isValid setter and getter
  @Input()
  get isValid(): boolean {
    return this._isValid;
  }
  @Output() isValidChange = new EventEmitter();
  set isValid(value: boolean) {
    this._isValid = value;
    this.isValidChange.emit(this._isValid);
  }

  private _iban: Iban;
  private _isValid: boolean;
}
