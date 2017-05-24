import {
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements AfterContentInit {

  get hasSelection(): boolean {
    return this._hasSelection;
  }
  set hasSelection(value: boolean) {
    this._hasSelection = value;
    this.updateVisibility();
  }

  get isSelected(): boolean {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this._isSelected = value;
    this.updateVisibility();
  }

  @Input() title: string;
  @Input() private _isSelected = false;
  @Input() private _hasSelection = false;
  @Input() isFirst: boolean;
  @Output() onClick = new EventEmitter();
  @ViewChild('contentEl') contentEl: ElementRef;
  @ViewChild('titleEl') titleEl: ElementRef;
  @ViewChild('selectedContentEl') selectedContentEl: ElementRef;

  ngAfterContentInit() {
    this.updateVisibility();
  }

  updateVisibility() {
    if (this._hasSelection) {
      if (this._isSelected) {
        this.contentEl.nativeElement.style.maxWidth = window.outerWidth + 'px';
        this.contentEl.nativeElement.style.background = 'transparent';
        this.contentEl.nativeElement.style.boxShadow = '-5px 5px 10px lightgray';
        this.contentEl.nativeElement.style.borderLeft = '1px solid red';
        this.contentEl.nativeElement.style.borderBottom = '1px solid lightgray';
        this.contentEl.nativeElement.style.borderTop = '1px solid transparent';
        this.contentEl.nativeElement.style.borderRight = '1px solid transparent';
        this.contentEl.nativeElement.style.padding = '10px';
        this.contentEl.nativeElement.style.cursor = 'default';
        this.selectedContentEl.nativeElement.style.padding = '0 10px 10px 10px';
        this.titleEl.nativeElement.style.background = 'transparent';
        this.titleEl.nativeElement.style.border = 'none';
        this.titleEl.nativeElement.style.pointerEvents = 'none';
        this.titleEl.nativeElement.style.fontSize = '120%';
      } else {
        this.contentEl.nativeElement.style.maxWidth = '';
        this.contentEl.nativeElement.style.background = '';
        this.contentEl.nativeElement.style.boxShadow = '';
        this.contentEl.nativeElement.style.border = '';
        this.contentEl.nativeElement.style.borderTop = '';
        this.contentEl.nativeElement.style.borderRight = '';
        this.contentEl.nativeElement.style.padding = '';
        this.contentEl.nativeElement.style.cursor = '';
        this.selectedContentEl.nativeElement.style.padding = '';
        this.titleEl.nativeElement.style.background = '';
        this.titleEl.nativeElement.style.border = '';
        this.titleEl.nativeElement.style.pointerEvents = '';
        this.titleEl.nativeElement.style.fontSize = '';
      }
    } else {
      this.contentEl.nativeElement.style.display = '';
    }
    if (!this.isFirst) {
      this.contentEl.nativeElement.style.marginTop = '10px';
    }
  }
}
