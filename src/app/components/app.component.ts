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
  private progressIndex: number = 1;

  private onAccountClick(account: Account): void {
    this.account = account;
    this.doProgress(1);
  }

  private doProgress(step: number): void {
    if (this.progressIndex === step) {
      this.progressIndex++;
      this.stepIndex = this.progressIndex;
    }
  }

  private onStepClick(step: number): void {
    if (step <= this.progressIndex) {
      this.stepIndex = step;
    }
  }
}
