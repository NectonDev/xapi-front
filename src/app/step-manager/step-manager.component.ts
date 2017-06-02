import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {StepComponent} from '../step/step.component';
import {StepManagerService} from '../step-manager.service';

@Component({
  selector: 'app-step-manager',
  templateUrl: './step-manager.component.html',
  styleUrls: ['./step-manager.component.css']
})
export class StepManagerComponent implements AfterContentInit {
  stepNameMap = {};
  stepNameIndexMap = {};
  selectedStep = -1;
  progress = 0;
  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

  ngAfterContentInit() {
    const stepsArray = this.steps.toArray();
    for (let i = 0; i < stepsArray.length; i++) {
      const step = stepsArray[i];
      step.stepIndex = i + 1;
      step.isLastStep = i === stepsArray.length - 1;
      this.stepNameMap[step.getName()] = step;
      this.stepNameIndexMap[step.getName()] = i;
      step.stepClick.subscribe(() => {
        this.selectStep(step);
      });
    }
    this.selectStep(stepsArray[0]);
  }

  constructor(stepManagerService: StepManagerService) {
    stepManagerService.setGoToStepListener((stepName: string) => {
      this.selectStep(this.stepNameMap[stepName]);
    });
    stepManagerService.setDoProgressListener((stepName: string) => {
      const stepIndex = this.stepNameIndexMap[stepName];
      if (stepIndex <= this.progress + 1) {
        if (stepIndex - 1 === this.progress) {
          this.progress++;
        }
        this.selectStep(this.steps.toArray()[stepIndex]);
      }
    });
  }

  selectStep(step: StepComponent) {
    if (this.stepIsAllowedToBeSelected(step)) {
      const stepsArray = this.steps.toArray();
      for (let i = 0; i < stepsArray.length; i++) {
        const step1 = stepsArray[i];
        step1.isSelected = step1 === step;
      }
    }
    this.updateIsTime();
  }

  updateIsTime() {
    const stepsArray = this.steps.toArray();
    for (let i = 0; i < stepsArray.length; i++) {
      const step = stepsArray[i];
      step.isTime = i <= this.progress;
    }
  }

  stepIsAllowedToBeSelected(step: StepComponent): boolean {
    const stepIndex = this.stepNameIndexMap[step.getName()];
    return stepIndex !== this.selectedStep && stepIndex <= this.progress;
  }
}
