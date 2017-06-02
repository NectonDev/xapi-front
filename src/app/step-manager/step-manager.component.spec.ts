import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepManagerComponent } from './step-manager.component';

describe('StepManagerComponent', () => {
  let component: StepManagerComponent;
  let fixture: ComponentFixture<StepManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
