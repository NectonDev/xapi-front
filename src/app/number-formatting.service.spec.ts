import { TestBed, inject } from '@angular/core/testing';

import { NumberFormattingService } from './number-formatting.service';

describe('NumberFormattingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberFormattingService]
    });
  });

  it('should be created', inject([NumberFormattingService], (service: NumberFormattingService) => {
    expect(service).toBeTruthy();
  }));
});
