import { Component, EventEmitter, Output } from '@angular/core';
import { RECIPIENTS } from '../mocks/recipient.mock';
import { Recipient } from '../models/recipient';

@Component({
  selector: 'recipient-selector',
  templateUrl: './html/recipient_selector.component.html',
  styleUrls: ['./css/recipient_selector.component.css']
})
export class RecipientSelectorComponent {
  private recipients: Recipient[] = RECIPIENTS;
  @Output() onSelectChange: EventEmitter<Recipient> = new EventEmitter();

  onRecipientClick(recipient: Recipient): void {
    this.onSelectChange.emit(recipient);
    recipient.select();
  }
}
