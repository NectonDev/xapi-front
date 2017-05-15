import {
  AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output,
  ViewChild
} from '@angular/core';
import { RECIPIENTS } from '../../mocks/recipient.mock';
import { Recipient } from '../../models/recipient';

@Component({
  selector: 'recipient-selector',
  templateUrl: './recipient_selector.component.html',
  styleUrls: ['./recipient_selector.component.css']
})
export class RecipientSelectorComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.updateComputedValues();
  }

  get formVisible(): boolean {
    return this._formVisible;
  }

  set formVisible(value: boolean) {
    this._formVisible = value;
  }

  @ViewChild('recipientListContainer') recipientListContainer: ElementRef;
  @ViewChild('recipientList') recipientList: ElementRef;
  private recipients: Recipient[] = RECIPIENTS;
  private _formVisible: boolean = false;
  private listWidth: number;
  private listContainerWidth: number;
  private listContainerOffset = 0;
  @Output() onSelectChange: EventEmitter<Recipient> = new EventEmitter();

  onRecipientClick(recipient: Recipient): void {
    this.onSelectChange.emit(recipient);
    recipient.select();
    this.formVisible = false;
  }

  private onSubmitNewRecipient(recipient: Recipient) {
    this.onSelectChange.emit(recipient);
  }

  private updateComputedValues() {
    this.listContainerWidth = Number.parseInt(window.getComputedStyle(
      this.recipientListContainer.nativeElement
    ).width);
    this.listWidth = Number.parseInt(window.getComputedStyle(
      this.recipientList.nativeElement
    ).width);
  }

  private scrollList(direction: number) {
    this.updateComputedValues();
    this.listContainerOffset += this.listContainerWidth * direction;
    let maxOffset = this.listWidth - this.listContainerWidth;
    let offsetIsGreaterThanAllowed = this.listContainerOffset > maxOffset;
    let offsetUnderZero = this.listContainerOffset < 0;
    this.listContainerOffset = offsetIsGreaterThanAllowed ? maxOffset : offsetUnderZero ? 0 : this.listContainerOffset;
    this.recipientListContainer.nativeElement.scrollLeft = this.listContainerOffset;
  }

  private isScrollNeeded(): boolean {
    return this.listWidth > this.listContainerWidth;
  }

  private onWindowResize() {
    this.updateComputedValues();
  }
}
