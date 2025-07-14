import { TestBed } from '@angular/core/testing';

import { ProductdbService } from './productdb.service';

describe('ProductdbService', () => {
  let service: ProductdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
