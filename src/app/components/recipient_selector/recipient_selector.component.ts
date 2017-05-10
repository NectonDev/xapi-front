import { Component, EventEmitter, Output } from '@angular/core';
import { RECIPIENTS } from '../../mocks/recipient.mock';
import { Recipient } from '../../models/recipient';

@Component({
  selector: 'recipient-selector',
  templateUrl: './recipient_selector.component.html',
  styleUrls: ['./recipient_selector.component.css']
})
export class RecipientSelectorComponent {
  private recipients: Recipient[] = RECIPIENTS;
  @Output() onSelectChange: EventEmitter<Recipient> = new EventEmitter();

  onRecipientClick(recipient: Recipient): void {
    this.onSelectChange.emit(recipient);
    recipient.select();
  }
}
