import { Component } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'my-app',
  templateUrl: './html/app.component.html',
  styleUrls: ['./css/app.component.css']
})
export class AppComponent  {

  private account: Account;
  private stepIndex: number = 1;

  private onAccountClick(account: Account): void {
    this.account = account;
  }

  private onStepClick(step: number): void {
    this.stepIndex = step;
  }
}
