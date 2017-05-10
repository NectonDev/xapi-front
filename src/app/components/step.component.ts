import {Component, EventEmitter, Input, Output, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';
@Component({
  selector: 'step',
  templateUrl: './html/step.component.html',
  styleUrls: ['./css/step.component.css'],
  animations: [
    trigger('selectionTrigger', [
      state('selected', style({height: '*'})),
      state('unselected', style({height: '0px'})),
      transition('unselected => selected', animate('200ms')),
      transition('selected => unselected', animate('200ms')),
    ])
  ]
})
export class StepComponent {
  static STEP_COUNT: number = 0;
  private _step: number;
  @ViewChild('content') _contentEl: ElementRef;

  @Output() stepClick: EventEmitter<number> = new EventEmitter();
  @Input() selection: string;
  @Input() title: string;
  @Input() stepIndex: number;
  @Input() progressIndex: number;
  @Input() subtitle: string;

  constructor() {
    this._step = ++StepComponent.STEP_COUNT;
  }

  private isSelected(): boolean {
    return this._step === this.stepIndex;
  }

  private isTime(): boolean {
    return this._step <= this.progressIndex;
  }

  private hasSelection(): boolean {
    return this.selection !== undefined;
  }

  private onClick(): void {
    this.stepClick.emit(this._step);
  }

  private isLastStep(): boolean {
    return this._step === StepComponent.STEP_COUNT;
  }

  private onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'selected') {
      this._contentEl.nativeElement.style.overflowY = 'auto';
    }
  }

  private onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'unselected') {
      this._contentEl.nativeElement.style.overflowY = '';
    }
  }
}
