import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NumberFormattingService} from '../number-formatting.service';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.css']
})
export class MoneyInputComponent {
  @Input()
  get value(): string {
    return this._value;
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  set value(value: string) {
    if (!value || value.length === 0) {
      value = '0';
    }
    this._value = value;
    this.valueChange.emit(value);
  }
  private _value: string;
  @Input() currency: string;
  @Input() placeholder: string;
  isFocused: boolean;
  isHovering: boolean;
  nfs: NumberFormattingService;

  constructor(numberFormattingService: NumberFormattingService) {
    this.nfs = numberFormattingService;
  }

  onBlur() {
    if (!this.value || this.value.length === 0) {
      this.value = '0';
    } else {
      console.log('DE: ' + this.nfs.toLocaleString(this.nfs.parseNumber(this.value), 2, 2));
      this.value = this.nfs.toLocaleString(this.nfs.parseNumber(this.value), 2, 2);
    }
  }
}
