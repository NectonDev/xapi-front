import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rb',
  templateUrl: './rb.component.html',
  styleUrls: ['./rb.component.css']
})
export class RbComponent {
  @Input() title: string;
  @Input() isSelected: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
}
