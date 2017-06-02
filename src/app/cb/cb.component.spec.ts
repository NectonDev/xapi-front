import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbComponent } from './cb.component';

describe('CbComponent', () => {
  let component: CbComponent;
  let fixture: ComponentFixture<CbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
