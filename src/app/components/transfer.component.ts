import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'transfer',
  template: `
    <div class="card">
      <input type="text" name="iniQ">
    </div>
  `,
  styles: [`
    .card {
      display: inline-block;
      background: white;
      padding: 10px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 5px lightgray;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    input {
      border: none;
    }
  `]
})
export class TransferComponent {

  @Output() onOperationDone: EventEmitter<any> = new EventEmitter();
}
