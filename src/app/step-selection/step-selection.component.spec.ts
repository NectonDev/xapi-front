import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSelectionComponent } from './step-selection.component';

describe('StepSelectionComponent', () => {
  let component: StepSelectionComponent;
  let fixture: ComponentFixture<StepSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
