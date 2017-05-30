import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
@Component({
  selector: 'app-flags-dropdown',
  templateUrl: './flags-dropdown.component.html',
  styleUrls: ['./flags-dropdown.component.css']
})
export class FlagsDropdownComponent {
  _selectedKey: string;
  isShowingList = false;
  @Input() keysAndFlagsMap: Map<string, string>;
  @Input() allowSelection = true;
  @Input() flagType: string;

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

  getFlagName(): string {
    const selectedFlag = this.keysAndFlagsMap.get(this._selectedKey);
    return selectedFlag ? selectedFlag : '';
  }

  getSelectedKey(): string {
    return this.selectedKey ? this.selectedKey.toUpperCase() : 'Select a ' + this.flagType;
  }

  toggleList() {
    if (this.allowSelection) {
      this.isShowingList = !this.isShowingList;
    }
  }
}
