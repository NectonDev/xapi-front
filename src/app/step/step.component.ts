import {Component, EventEmitter, Input, Output, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger, AnimationEvent, keyframes} from '@angular/animations';
@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  animations: [
    trigger('selectionTrigger', [
      state('selected', style({height: '*'})),
      state('unselected', style({height: 0})),
      transition('unselected => selected', animate('200ms')),
      transition('selected => unselected', animate('200ms'))
    ])
  ]
})
export class StepComponent {
  static STEP_COUNT = 0;
  _step: number;
  _isSelected: boolean;
  @Output() stepClick: EventEmitter<number> = new EventEmitter();
  @Input() selection: string;
  @Input() title: string;
  @Input() stepIndex: number;
  @Input() progressIndex: number;
  @ViewChild('content') _contentEl: ElementRef;

  constructor() {
    this._step = ++StepComponent.STEP_COUNT;
  }

  isSelected(): boolean {
    const retValue = this._step === this.stepIndex;
    if (this._isSelected !== retValue) {
      this._isSelected = retValue;
      this._contentEl.nativeElement.style.overflowY = '';
      setTimeout(() => {
        if (retValue === true) {
          this._contentEl.nativeElement.style.overflowY = 'visible';
        }
      }, 500);
    }
    return retValue;
  }

  isTime(): boolean {
    return this._step <= this.progressIndex;
  }

  hasSelection(): boolean {
    return this.selection !== undefined;
  }

  onClick(): void {
    this.stepClick.emit(this._step);
  }

  isLastStep(): boolean {
    return this._step === StepComponent.STEP_COUNT;
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'selected') {
      this._contentEl.nativeElement.style.overflowY = 'auto';
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'unselected') {
      this._contentEl.nativeElement.style.overflowY = '';
    }
  }
}
