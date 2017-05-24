import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
@Component({
  selector: 'app-flags-dropdown',
  templateUrl: './flags-dropdown.component.html',
  styleUrls: ['./flags-dropdown.component.css']
})
export class FlagsDropdownComponent {
  @Input() keysAndFlagsMap: Map<string, string>;
  _selectedKey: string;
  isShowingList = false;
  @Input() allowSelection = true;

  constructor() {
    document.addEventListener('mouseup', () => {
      this.isShowingList = false;
    }, true);
  }

  // selectedCurrency getter and setter
  @Input()
  get selectedKey() {
    return this._selectedKey;
  }
  @Output()selectedKeyChange = new EventEmitter();
  set selectedKey(val) {
    this._selectedKey = val;
    this.selectedKeyChange.emit(this._selectedKey);
  }

  toggleList() {
    if (this.allowSelection) {
      this.isShowingList = !this.isShowingList;
    }
  }
}
