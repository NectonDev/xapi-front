import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup-option',
  templateUrl: './popup-option.component.html',
  styleUrls: ['./popup-option.component.css']
})
export class PopupOptionComponent {
  @Input() name: string;
  @Input() title: string;
  isVisible: boolean;

  public getName(): string {
    return this.name;
  }

  public show() {
    if (!this.isVisible) {
      this.isVisible = true;
    }
  }

  public hide() {
    if (this.isVisible) {
      this.isVisible = false;
    }
  }

  public getTitle(): string {
    return this.title;
  }
}
