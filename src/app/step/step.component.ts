import {Component, EventEmitter, Input, Output, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {
  private _isSelected: boolean;
  @Input() isLastStep: boolean;
  @Input() isTime: boolean;
  @Input() stepIndex: number;
  @Input() name: string;
  @Input() title: string;
  @Input() selectedProperties: StepSelection[];
  @ViewChild('content') _contentEl: ElementRef;
  @Output() stepClick: EventEmitter<any> = new EventEmitter();

  // isSelected getter and setter
  @Input()
  get isSelected(): boolean {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this._isSelected = value;
    this._contentEl.nativeElement.style.overflowY = '';
    setTimeout(() => {
      if (this._isSelected === true) {
        this._contentEl.nativeElement.style.overflowY = 'visible';
      }
    }, 500);
  }

  public getName(): string {
    return this.name;
  }
}

export class StepSelection {
  constructor(public propertyName: string, public propertyValue: string) {}
}
