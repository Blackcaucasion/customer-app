import { TestBed } from '@angular/core/testing';

import { CustomerAdaptorService } from './customer-adaptor.service';

describe('CustomerAdaptorService', () => {
  let service: CustomerAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
