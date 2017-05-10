import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  @Output() onOperationDone: EventEmitter<any> = new EventEmitter();
}
