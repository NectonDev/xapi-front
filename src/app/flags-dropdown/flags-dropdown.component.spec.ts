import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsDropdownComponent } from './flags-dropdown.component';

describe('FlagsDropdownComponent', () => {
  let component: FlagsDropdownComponent;
  let fixture: ComponentFixture<FlagsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
