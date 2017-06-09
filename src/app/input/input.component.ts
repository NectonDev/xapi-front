import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input()
  get value(): string {
    return this._value;
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  set value(value: string) {
    this._value = value;
    this.valueChange.emit(value);
  }
  private _value: string;
  @Input() placeholder;
  @Input() tooltip;
  isFocused: boolean;
  isHovering: boolean;
  isShowingTooltip: boolean;
}
