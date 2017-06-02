import {
  AfterContentInit, Component, ContentChildren, OnInit, QueryList, Input, Output,
  EventEmitter
} from '@angular/core';
import {RbComponent} from '../rb/rb.component';

@Component({
  selector: 'app-rb-group',
  templateUrl: './rb-group.component.html',
  styleUrls: ['./rb-group.component.css']
})
export class RbGroupComponent implements AfterContentInit {
  private _selectionIndex: number
  @ContentChildren(RbComponent) radioButtons: QueryList<RbComponent>;

  // selectionIndex getter and setter
  @Input()
  get selectionIndex(): number {
    return this._selectionIndex;
  }
  @Output() selectionIndexChange: EventEmitter<number> = new EventEmitter();
  set selectionIndex(value: number) {
    this._selectionIndex = value;
    this.selectionIndexChange.emit(this._selectionIndex);
  }

  ngAfterContentInit() {
    const radioButtonsArray = this.radioButtons.toArray();
    for (let i = 0; i < radioButtonsArray.length; i++) {
      const radioButton = radioButtonsArray[i];
      radioButton.onClick.subscribe(() => {
        this.selectionIndex = i;
        this.updateRadioButtonsSelection();
      });
    }
    this.updateRadioButtonsSelection();
  }

  updateRadioButtonsSelection() {
    const radioButtonsArray = this.radioButtons.toArray();
    for (let i = 0; i < radioButtonsArray.length; i++) {
      const radioButton = radioButtonsArray[i];
      radioButton.isSelected = this._selectionIndex === i;
    }
  }
}
