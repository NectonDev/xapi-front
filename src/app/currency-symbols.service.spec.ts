import { TestBed, inject } from '@angular/core/testing';

import { CurrencySymbolsService } from './currency-symbols.service';

describe('CurrencySymbolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencySymbolsService]
    });
  });

  it('should be created', inject([CurrencySymbolsService], (service: CurrencySymbolsService) => {
    expect(service).toBeTruthy();
  }));
});
