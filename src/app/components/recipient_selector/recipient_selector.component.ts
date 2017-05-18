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

  @ViewChild('recipientListContainer') recipientListContainer: ElementRef;
  @ViewChild('recipientList') recipientList: ElementRef;
  private recipients: Recipient[] = RECIPIENTS;
  private _formVisible: boolean = false;
  private listWidth: number;
  private listContainerWidth: number;
  private listContainerOffset = 0;
  @Output() onSelectChange: EventEmitter<Recipient> = new EventEmitter();
  ngAfterViewInit() {
    this.updateComputedValues();
  }

  get formVisible(): boolean {
    return this._formVisible;
  }

  set formVisible(value: boolean) {
    this._formVisible = value;
  }

  onRecipientClick(recipient: Recipient): void {
    this.onSelectChange.emit(recipient);
    recipient.select();
    this.formVisible = false;
  }

  private onSubmitNewRecipient(recipient: Recipient) {
    this.onSelectChange.emit(recipient);
  }

  private updateComputedValues() {
    this.listContainerWidth = Number.parseInt(window.getComputedStyle(this.recipientListContainer.nativeElement).width);
    this.listWidth = Number.parseInt(window.getComputedStyle(this.recipientList.nativeElement).width);
  }

  private scrollList(direction: number) {
    this.updateComputedValues();
    this.listContainerOffset += Math.round(this.listContainerWidth / 2) * direction;
    let maxOffset = this.listWidth + 20 - this.listContainerWidth;
    let offsetIsGreaterThanAllowed = this.listContainerOffset > maxOffset;
    let offsetUnderZero = this.listContainerOffset < 0;
    this.listContainerOffset = offsetIsGreaterThanAllowed ? maxOffset : offsetUnderZero ? 0 : this.listContainerOffset;
    this.recipientList.nativeElement.style.left = `${-this.listContainerOffset + 10}px`;
  }

  private isScrollNeeded(): boolean {
    let retValue = this.listWidth > this.listContainerWidth;
    if (!retValue) {
      this.recipientList.nativeElement.style.left = '';
    }
    return retValue;
  }

  private onWindowResize() {
    this.updateComputedValues();
  }
}
