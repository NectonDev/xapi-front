import { Injectable } from '@angular/core';

@Injectable()
export class StepManagerService {
  goToStepListener: (stepName: string) => any;
  doProgressListener: (stepName: string) => any;

  public setGoToStepListener(goToStepListener: (stepName: string) => any) {
    this.goToStepListener = goToStepListener;
  }

  public setDoProgressListener(doProgressListener: (stepName: string) => any) {
    this.doProgressListener = doProgressListener;
  }

  public goToStep(stepName: string) {
    if (!!this.goToStepListener) {
      this.goToStepListener(stepName);
    }
  }

  public doProgress(stepName: string) {
    this.doProgressListener(stepName);
  }
}
