import { TestBed } from '@angular/core/testing';

import { PontOfSaleService } from './pont-of-sale.service';

describe('PontOfSaleService', () => {
  let service: PontOfSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontOfSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
