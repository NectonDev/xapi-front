import {
  AfterContentChecked,
  AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output,
  ViewChild
} from '@angular/core';
import { PAYEES } from '../../mocks/payee.mock';
import { Payee } from '../../models/payee';

@Component({
  selector: 'app-recipient-selector',
  templateUrl: './recipient-selector.component.html',
  styleUrls: ['./recipient-selector.component.css']
})
export class RecipientSelectorComponent implements AfterContentChecked {
  recipients: Payee[] = PAYEES;
  listWidth: number;
  listContainerWidth: number;
  listContainerOffset = 0;
  _isScrollNeeded: boolean;
  _selectedRecipient: Payee;
  @ViewChild('recipientListContainer') recipientListContainer: ElementRef;
  @ViewChild('recipientList') recipientList: ElementRef;

  constructor() {
    setInterval(() => {
      this.onWindowResize();
    }, 100);
  }

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

  // selectedRecipient setter and getter
  @Input()
  get selectedRecipient(): Payee {
    return this._selectedRecipient;
  }
  @Output() selectedRecipientChange: EventEmitter<Payee> = new EventEmitter();
  set selectedRecipient(recipient: Payee) {
    this._selectedRecipient = recipient;
    this.selectedRecipientChange.emit(this._selectedRecipient);
  }

  ngAfterContentChecked() {
    this.listWidth = 160 * this.recipients.length - 10;
    this.updateComputedValues();
  }

  onWindowResize() {
    this.updateComputedValues();
  }

  updateComputedValues() {
    this.listContainerWidth = Number.parseInt(window.getComputedStyle(this.recipientListContainer.nativeElement).width);
    this.isScrollNeeded = this.listWidth > this.listContainerWidth;
  }

  onSubmitNewRecipient(recipient: Payee) {
    this.selectedRecipient = recipient;
  }

  scrollList(direction: number) {
    this.updateComputedValues();
    this.listContainerOffset += Math.round(this.listContainerWidth / 2) * direction;
    const maxOffset = this.listWidth + 20 - this.listContainerWidth;
    const offsetIsGreaterThanAllowed = this.listContainerOffset > maxOffset;
    const offsetUnderZero = this.listContainerOffset < 0;
    this.listContainerOffset = offsetIsGreaterThanAllowed ? maxOffset : offsetUnderZero ? 0 : this.listContainerOffset;
    this.recipientList.nativeElement.style.left = `${-this.listContainerOffset + 10}px`;
  }
}
