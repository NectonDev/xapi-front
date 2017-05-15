import {Component, Input} from '@angular/core';
import {Iban} from '../../models/iban';

@Component({
  selector: 'iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css']
})
export class IbanComponent {
  @Input() iban: Iban;
}
