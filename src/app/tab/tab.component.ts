import {
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @Input() title: string;
  @Input() private _isSelected = false;
  @Input() private _hasSelection = false;
  @Input() hasSelection: boolean;
  @Input() isSelected: boolean;
  @Input() isFirst: boolean;
  @Output() onClick = new EventEmitter();
}
