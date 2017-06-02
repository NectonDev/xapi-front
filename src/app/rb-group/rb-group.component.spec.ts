import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbGroupComponent } from './rb-group.component';

describe('RbGroupComponent', () => {
  let component: RbGroupComponent;
  let fixture: ComponentFixture<RbGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
