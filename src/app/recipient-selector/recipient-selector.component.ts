import {
  AfterContentChecked,
  AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output,
  ViewChild
} from '@angular/core';
import { RECIPIENTS } from '../../mocks/recipient.mock';
import { Recipient } from '../../models/recipient';

@Component({
  selector: 'app-recipient-selector',
  templateUrl: './recipient-selector.component.html',
  styleUrls: ['./recipient-selector.component.css']
})
export class RecipientSelectorComponent implements AfterContentChecked {

  // isScrollNeeded getter and setter
  get isScrollNeeded(): boolean {
    return this._isScrollNeeded;
  }
  set isScrollNeeded(value: boolean) {
    this._isScrollNeeded = value;
    if (!value) {
      this.recipientList.nativeElement.style.left = '';
    }
  }

  recipients: Recipient[] = RECIPIENTS;
  listWidth: number;
  listContainerWidth: number;
  listContainerOffset = 0;
  _isScrollNeeded: boolean;
  _selectedRecipient: Recipient;
  @ViewChild('recipientListContainer') recipientListContainer: ElementRef;
  @ViewChild('recipientList') recipientList: ElementRef;
  constructor() {
    setInterval(() => {
      this.onWindowResize();
    }, 1000);
  }

  // selectedRecipient setter and getter
  @Input()
  get selectedRecipient(): Recipient {
    return this._selectedRecipient;
  }
  @Output() selectedRecipientChange: EventEmitter<Recipient> = new EventEmitter();
  set selectedRecipient(recipient: Recipient) {
    this._selectedRecipient = recipient;
    this.selectedRecipientChange.emit(this._selectedRecipient);
  }

  ngAfterContentChecked() {
    this.listWidth = 180 * this.recipients.length - 10;
    this.updateComputedValues();
  }

  onWindowResize() {
    this.updateComputedValues();
  }

  updateComputedValues() {
    this.listContainerWidth = Number.parseInt(window.getComputedStyle(this.recipientListContainer.nativeElement).width);
    this.isScrollNeeded = this.listWidth > this.listContainerWidth;
  }

  onSubmitNewRecipient(recipient: Recipient) {
    this.selectedRecipient = recipient;
  }

  scrollList(direction: number) {
    this.updateComputedValues();
    this.listContainerOffset += Math.round(this.listContainerWidth / 2) * direction;
    let maxOffset = this.listWidth + 20 - this.listContainerWidth;
    let offsetIsGreaterThanAllowed = this.listContainerOffset > maxOffset;
    let offsetUnderZero = this.listContainerOffset < 0;
    this.listContainerOffset = offsetIsGreaterThanAllowed ? maxOffset : offsetUnderZero ? 0 : this.listContainerOffset;
    this.recipientList.nativeElement.style.left = `${-this.listContainerOffset + 10}px`;
  }
}
