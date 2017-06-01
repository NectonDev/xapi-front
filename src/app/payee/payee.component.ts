import { Component, Input } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { Payee } from '../../models/payee';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css'],
  animations: [
    trigger('headerState', [
      state('selected', style({
        background: '#FF0000',
        color: 'white'
      }))
    ])
  ]
})
export class PayeeComponent {
  @Input() recipient: Payee;
  @Input() selected: boolean;
}
