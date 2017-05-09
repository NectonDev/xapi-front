import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'step',
  templateUrl: './html/step.component.html',
  styleUrls: ['./css/step.component.css'],
  animations: [
    trigger('selectionTrigger', [
      state('selected', style({
        maxHeight: '200vh'
      })),
      state('unselected', style({
        maxHeight: 0
      })),
      transition('unselected => selected', animate('300ms ease-in')),
      transition('selected => unselected', animate('300ms ease-out'))
    ])
  ]
})
export class StepComponent {
  static STEP_COUNT: number = 0;
  private _step: number;

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
}
