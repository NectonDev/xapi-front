import { Component, Input } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { Recipient } from '../../models/recipient';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
  animations: [
    trigger('headerState', [
      state('selected', style({
        background: '#FF0000',
        color: 'white'
      }))
    ])
  ]
})
export class RecipientComponent {

  @Input() recipient: Recipient;
  @Input() selected: boolean;
}
