import { Component } from '@angular/core';
import { Account } from '../models/account';
import { Recipient } from '../models/recipient';
import { StepComponent } from './step.component';

@Component({
  selector: 'my-app',
  templateUrl: './html/app.component.html',
  styleUrls: ['./css/app.component.css']
})
export class AppComponent  {

  private account: Account;
  private recipient: Recipient;
  private stepIndex: number = 1;
  private progressIndex: number = 1;

  private onRecipientClick(recipient: Recipient): void {
    this.recipient = recipient;
    this.doProgress(1);
  }

  private onAccountClick(account: Account): void {
    this.account = account;
    this.doProgress(2);
  }

  private doProgress(step: number): void {
    if (this.progressIndex === step) {
      this.progressIndex++;
    }
    this.onStepClick(step + 1);
  }

  private onStepClick(step: number): void {
    if (step <= this.progressIndex && step <= StepComponent.STEP_COUNT) {
      this.stepIndex = step;
    }
  }
}
