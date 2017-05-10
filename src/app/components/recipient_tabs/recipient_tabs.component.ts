import {Component, EventEmitter, Output} from '@angular/core';
import {Recipient} from '../../models/recipient';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'recipient-tabs',
  templateUrl: './recipient_tabs.component.html',
  styleUrls: ['./recipient_tabs.component.css'],
  animations: [
    trigger('contentTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('hidden => visible', animate(200)),
      transition('visible => hidden', animate(1))
    ])
  ]
})
export class RecipientTabsComponent {

  private _contentState = 'hidden';
  private selectedTab: number;
  @Output() onRecipientChange: EventEmitter<Recipient> = new EventEmitter();

  private onTabClick(tab: number): void {
    this.selectedTab = tab;
    if (this._contentState === 'hidden') {
      this._contentState = 'visible';
    } else {
      this._contentState = 'hidden';
    }
  }

  private isSelected(tab: number): boolean {
    return this.selectedTab === tab;
  }

  private onRecipientClick(recipient: Recipient): void {
    this.onRecipientChange.emit(recipient);
  }

  private onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this._contentState = 'visible';
    }
  }
}
