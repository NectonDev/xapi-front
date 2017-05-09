import { Component, Input } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { Recipient } from '../models/recipient';

@Component({
  selector: 'recipient',
  templateUrl: './html/recipient.component.html',
  styleUrls: ['./css/recipient.component.css'],
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
}
