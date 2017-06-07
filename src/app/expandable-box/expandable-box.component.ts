import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-expandable-box',
  templateUrl: './expandable-box.component.html',
  styleUrls: ['./expandable-box.component.css']
})
export class ExpandableBoxComponent {
  @Input() title: string;
  isBodyVisible: boolean;

  toggleBody() {
    this.isBodyVisible = !this.isBodyVisible;
  }
}
