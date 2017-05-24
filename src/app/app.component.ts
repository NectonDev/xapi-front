import { Component } from '@angular/core';
import { Account } from '../models/account';
import { Recipient } from '../models/recipient';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  // recipient setter and getter
  get recipient(): Recipient {
    return this._recipient;
  }
  set recipient(value: Recipient) {
    this._recipient = value;
    if (!!value) {
      this.doProgress(1);
    }
  }

  // account getter and setter
  get account(): Account {
    return this._account;
  }
  set account(value: Account) {
    this._account = value;
    if (!!value) {
      this.doProgress(2);
    }
  }

  _account: Account;
  _recipient: Recipient;
  stepIndex = 1;
  progressIndex = 1;

  doProgress(step: number): void {
    if (this.progressIndex === step) {
      this.progressIndex++;
    }
    this.onStepClick(step + 1);
  }

  onStepClick(step: number): void {
    if (step <= this.progressIndex && step <= StepComponent.STEP_COUNT) {
      this.stepIndex = step;
    }
  }
}
